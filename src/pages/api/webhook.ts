import { stripe } from '@/lib/stripe';
import { Subscription } from '@/models/subscriptions';
import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'node:stream/consumers';


export const config = {
    api: {
      bodyParser: false,
    },
  }

  interface SubscriptionProps {
    subscription_id: string;
    gateway: string;
    object: string;
    period_start: number;
    period_end: number;
    status: string;
    wallet: string;
  }



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {

    let event = req.body;

    const buf = await buffer(req)
 
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature']!;

    try {   
        event = stripe.webhooks.constructEvent(
        buf.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(400);
    }
  
    let subscription;
    let status;

  // Handle the event
  switch (event.type) {

    case 'checkout.session.completed':
     
      const session = event.data.object;
      const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);

      const subscriptionToCreate: SubscriptionProps = {
        subscription_id: stripeSubscription.id,
        gateway: 'stripe',
        object: JSON.stringify(stripeSubscription),
        period_start: stripeSubscription.current_period_start,
        period_end: stripeSubscription.current_period_end,
        status: stripeSubscription.status,
        wallet: session.metadata.wallet,
      }

      handleSessionComplete(subscriptionToCreate);
      break;
    case 'customer.subscription.deleted':
      subscription = event.data.object;
    
      const currentTime = new Date().getTime() / 1000;
      const period_end = currentTime.toString().split('.')[0];
      
      handleSubscriptionDeleted({
        id: subscription.id, 
        status:subscription.status, 
        period_end
      }); 
      break;
    case 'customer.subscription.updated':
        subscription = event.data.object;
        
        handleSubscriptionUpdated({
          id:subscription.id,
          status: subscription.status,
          period_end: subscription.current_period_end
        }); 
        break;
    default:
      // Unexpected event type
      // console.log(`Unhandled event type ${event.type}.`);
  
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({received: true});
  }

  const handleSessionComplete = async (subscription: SubscriptionProps) => {
    try{
    await Subscription.create(subscription);
    } catch(e: any) {
      console.log('handleSessionComplete. Error: ', e.message);
    }
  }
  
  interface SubscriptionUpdated {
    id: string;
    status: string;
    period_end: string;
  }
  const handleSubscriptionDeleted = async (subscription: SubscriptionUpdated) => {
   const { id, status, period_end } = subscription;
   
   try{
    await Subscription.update(id, { status, period_end: Number(period_end) });
   } catch(e: any) {
    console.log('handleSubscriptionDeleted. Error: ', e.message);
   }
  }


  const handleSubscriptionUpdated = async (subscription:SubscriptionUpdated) => {

    const { id, status, period_end } = subscription;
   
    try{
      await Subscription.update(id, { status, period_end: Number(period_end) });
    } catch(e: any) {
      console.log('handleSubscriptionDeleted. Error: ', e.message);
    }
 
   }