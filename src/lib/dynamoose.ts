import * as dynamoose from "dynamoose";


const ddb = new dynamoose.aws.ddb.DynamoDB({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    "secretAccessKey":  process.env.AWS_SECRET_ACCESS_KEY as string,
    "region": "us-east-1"
} as any);


dynamoose.aws.ddb.set(ddb);

export default dynamoose;