import { Subscription } from "./models/subscriptions";

export async function userHasActiveSubscription(wallet: string) {
    const currentDateTime = new Date().getTime() / 1000;
    return  await Subscription.query("wallet").eq( '0x0000000').where('status').eq('active').where('period_end').gt(Number(currentDateTime)).exec();
}