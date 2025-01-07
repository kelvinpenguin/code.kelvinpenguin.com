import { useEffect, useState } from 'react';

export default function FileList() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('/api/files')
            .then((res) => res.json())
            .then((data) => setFiles(data));
    }, []);

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file) => (
                    <li key={file._id}>
                        {file.filename} -{' '}
                        <a href={`/api/download?filename=${file.filename}`} download>
                            Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
