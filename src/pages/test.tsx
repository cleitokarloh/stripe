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
  
  // const subscription = await stripe.subscriptions.update('sub_1Mo6JmBeDkJ4UWAX2BgJKgYc', {
  //   items: [
  //     {
  //       id: 'si_NZKn7hWvllzknr',
  //       deleted: true
  //     },
  //     {
  //       price:'price_1Mme9lBeDkJ4UWAXGhakPx3X',
  //       quantity: 1,
  //     }
  //   ]
  // })
    console.log(subscription);
    return {
      props: {
        products: [],
      }
    }
  }