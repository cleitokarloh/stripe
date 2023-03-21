import dynamoose from "@/lib/dynamoose";
import { Item } from "dynamoose/dist/Item";

const subscriptionSchema = new dynamoose.Schema({
    subscription_id: {
        type: String,
        hashKey: true,
    },
    gateway: {
        type: String,
        required: true,
    },
    wallet: {
        type: String,
        required: true,
        'index': {
            name: 'wallet-index'
        }
    },
    object:{
        type: String,
        required: true,
    },
    period_start: {
        type: Number,
        required: true,
    },
    period_end: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
    },
    {
        timestamps: true,
    });

    class  SubscriptionModel extends Item {
        subscription_id: string;
        gateway: string;
        object: string;
        period_start: number;
        period_end: number;
        status: string;
        wallet: string;
      }
    

   export const Subscription = dynamoose.model<SubscriptionModel>('Subscription', subscriptionSchema);