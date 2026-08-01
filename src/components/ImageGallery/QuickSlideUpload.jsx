import { useState } from "react";

import { uploadFile } from "../../services/storage/storage";
import { createSlide } from "../../services/adminDatabase";
import { cleanTitle } from "../../services/importMatching";

function QuickSlideUpload({ lectureId, nextPageNumber, onUploaded }) {

    const [uploading, setUploading] = useState(false);

    const [status, setStatus] = useState("");

    async function handleFiles(event) {

        const files = Array.from(event.target.files);

        if (files.length === 0) {

            return;

        }

        setUploading(true);

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            setStatus(`Laddar upp ${i + 1}/${files.length}...`);

            const upload = await uploadFile({

                bucket: "slides",

                folder: `lecture-${lectureId}`,

                file

            });

            if (!upload) {

                continue;

            }

            const created = await createSlide({

                title: cleanTitle(file.name),

                image_url: upload.publicUrl,

                lecture_id: lectureId,

                page_number: (nextPageNumber ?? 0) + i + 1

            });

            if (created) {

                onUploaded?.(created);

            }

        }

        setStatus("");

        setUploading(false);

        event.target.value = "";

    }

    return (

        <div className="quick-image-upload">

            <label className="quick-image-upload-button">

                {uploading ? status || "Laddar upp..." : "➕ Lägg till originalslide(s) här"}

                <input

                    type="file"

                    accept="image/*"

                    multiple

                    disabled={uploading}

                    onChange={handleFiles}

                />

            </label>

        </div>

    );

}

export default QuickSlideUpload;
