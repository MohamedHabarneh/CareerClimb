import {MongoClient} from 'mongodb'
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI);

export function start_mongo(): Promise<MongoClient>{
    console.log("Starting mongo");
    return client.connect();
}

export default client.db()