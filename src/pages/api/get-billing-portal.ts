// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripe';
import type { NextApiRequest, NextApiResponse } from 'next'


const goBackUrl = `${process.env.NEXT_URL}/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {
    const { customerId, locale } = req.body;

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: goBackUrl,
            locale: locale,
          });
    
          return res.json({
            url: session.url
          })
    } catch(err:any) {
        return res.status(400).json({ error: err.message })
    }
    
  }