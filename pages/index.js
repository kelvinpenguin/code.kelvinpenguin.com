import UploadForm from '../components/UploadForm';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <h1>File Upload</h1>
            <UploadForm />
            <Link href="/files">
                <button>View Files</button>
            </Link>
        </div>
    );
}
