import { stripe } from "@/lib/stripe";

import { GetServerSideProps } from "next";

export default function Test() {
    return (
        <div>
        <h1>Test</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const session = await stripe.billingPortal.sessions.create({
    customer: 'cus_NZi9r0X9Qrg4xsxsxsxYJ',
    return_url: 'https://example.com/account',
    locale: 'pt-BR',
  });
  console.log(session);  
  // const subscription = await stripe.subscriptions.update('sub_1MoYjNBeDkJ4UWAXLmwhGPgP')
  // console.log(subscription);
    return {
      props: {
        products: [],
      }
    }
  }