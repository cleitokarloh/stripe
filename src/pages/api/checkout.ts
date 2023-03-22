// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { stripe } from '@/lib/stripe';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse) {

  const successUrl = `${process.env.NEXT_URL}/response/success`;
  const cancelUrl = `${process.env.NEXT_URL}/response/cancel`;

  const {priceId, locale } = req.body;

  if(!priceId) return res.status(400).json({ error: 'Price not found.' })
  

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'subscription',
    client_reference_id: '1234',
    locale,
    
    metadata: {
      wallet: '0x0000000',
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      }
    ]
  });

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
