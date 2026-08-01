import { useState } from "react";

import { uploadFile } from "../../services/storage/storage";
import { createImage } from "../../services/adminDatabase";
import { cleanTitle } from "../../services/importMatching";

function QuickImageUpload({ lectureId, onUploaded }) {

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

                bucket: "images",

                folder: `lecture-${lectureId}`,

                file

            });

            if (!upload) {

                continue;

            }

            const created = await createImage({

                title: cleanTitle(file.name),

                image_url: upload.publicUrl,

                lecture_id: lectureId,

                category_id: null,

                slide_id: null,

                description: ""

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

                {uploading ? status || "Laddar upp..." : "➕ Lägg till bild(er) här"}

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

export default QuickImageUpload;
