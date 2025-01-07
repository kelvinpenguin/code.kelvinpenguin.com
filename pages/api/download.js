import { MongoClient, GridFSBucket } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    const downloadStream = bucket.openDownloadStreamByName(req.query.filename);

    res.setHeader('Content-Type', 'application/octet-stream');
    downloadStream.pipe(res);
}
