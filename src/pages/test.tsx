import { Subscription } from "@/models/subscriptions";
import { GetServerSideProps } from "next";

export default function Test() {
    return (
        <div>
        <h1>Test</h1>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const id =  Math.random().toString();
    const sub = await Subscription.create({
      gateway: 'stripe',
      subscription_id:id,
      period_start: 11111,
      period_end: 11112,
      status: 'active',
      object: '{}',
      wallet: '0x123',
    });
  

    await Subscription.update(
       id,
      {
        status: 'canceled',
        period_end: 333333
     });


    console.log(sub);
    return {
      props: {
        products: [],
      }
    }
  }