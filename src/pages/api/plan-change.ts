// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripe';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    
    const { subscriptionId, priceId, currentPlanId } = req.body

    try {

        await stripe.subscriptions.update(subscriptionId, {
            items: [
              {
                id: currentPlanId,
                deleted: true
              },
              {
                price: priceId,
                quantity: 1,
              }
            ]
          });
          return res.status(200).json('Subscription plan is changed!')
    } catch(error: any) {
        console.log(error);
      return res.status(400).json('Error on change subscription plan. Error:' + error.raw.message)
    }

  }