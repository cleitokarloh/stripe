// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripe';
import { Subscription } from '@/models/subscriptions';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    
    const { wallet } = req.body

    const currentDateTime = new Date().getTime() / 1000;
    const subscription = await Subscription.query("wallet").eq(wallet).where('status').eq('active').where('period_end').gt(Number(currentDateTime)).exec();

    if (subscription.length === 0) {
        res.status(400).json({ error: 'No active subscription found' })
        return
    }

    const subscriptionId = subscription[0].subscription_id

    try {
        await stripe.subscriptions.cancel(subscriptionId)
    }catch(e:any) {
        return res.status(400).json({ error: e.message })
        return
    }

    

    return res.status(200).json('Subscription canceled!')
  }