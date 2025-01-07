import nextConnect from 'next-connect';
import multer from 'multer';
import { MongoClient, GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

const upload = multer();

const handler = nextConnect();

handler.use(upload.single('file'));

handler.post(async (req, res) => {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const bucket = new GridFSBucket(db, { bucketName: 'uploads' });
    const readableStream = new Readable();
    readableStream.push(req.file.buffer);
    readableStream.push(null);

    const uploadStream = bucket.openUploadStream(req.file.originalname);

    readableStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
        res.json({ message: 'File uploaded successfully' });
    });

    uploadStream.on('error', (err) => {
        console.error(err);
        res.status(500).json({ error: 'Upload failed' });
    });
});

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
};
