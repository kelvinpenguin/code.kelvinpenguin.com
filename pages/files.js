import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const files = await db.collection('uploads.files').find({}).toArray();

    res.status(200).json(files);
}
