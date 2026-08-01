import { useState } from "react";

import { uploadFile } from "../../services/storage/storage";
import { updateLecture } from "../../services/adminDatabase";

function LectureFileUpload({ lecture, onUploaded }) {

    const [uploading, setUploading] = useState(false);

    async function handleFile(event) {

        const file = event.target.files[0];

        if (!file) return;

        setUploading(true);

        const upload = await uploadFile({

            bucket: "slides",

            folder: `lecture-${lecture.id}`,

            file

        });

        if (upload) {

            await updateLecture(lecture.id, { pdf_url: upload.publicUrl });

            onUploaded?.(upload.publicUrl);

        }

        setUploading(false);

        event.target.value = "";

    }

    if (lecture.pdf_url) {

        return (

            <p className="lecture-file-status">

                📄 <a href={lecture.pdf_url} target="_blank" rel="noreferrer">

                    Originalmaterial

                </a> uppladdat

            </p>

        );

    }

    return (

        <div className="quick-image-upload">

            <label className="quick-image-upload-button">

                {uploading ? "Laddar upp..." : "📄 Lägg till originalmaterial (PDF)"}

                <input

                    type="file"

                    accept=".pdf,.pptx,image/*"

                    disabled={uploading}

                    onChange={handleFile}

                />

            </label>

        </div>

    );

}

export default LectureFileUpload;
