import { Collection, MongoClient} from "mongodb";
import { MONGODB_URI } from '$env/static/private';

export const dbConn = async (): Promise<Collection> => {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const dbName = "JobBoard";
    const db = client.db(dbName);
    const collection = db.collection('Users');
    return collection;
}

export const jobDbConn = async (): Promise<Collection> => {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const dbName = "JobBoard";
    const db = client.db(dbName);
    const collection = db.collection('Jobs');
    return collection;
}

export const companyDbConn = async (): Promise<Collection> => {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const dbName = "JobBoard";
    const db = client.db(dbName);
    const collection = db.collection('Companies');
    return collection;
}