import { useState } from "react";

import AdminSelect from "./AdminSelect";

import { uploadFile } from "../../services/storage/storage";
import { createSlide } from "../../services/adminDatabase";
import { cleanTitle } from "../../services/importMatching";

function AdminSlideUpload({ lectures, refresh }) {

    const [lectureId, setLectureId] = useState("");

    const [uploading, setUploading] = useState(false);

    const [status, setStatus] = useState("");

    async function handleFiles(event) {

        const files = Array.from(event.target.files);

        if (!lectureId) {

            alert("Välj vilken föreläsning slidesen hör till.");

            event.target.value = "";

            return;

        }

        if (files.length === 0) return;

        setUploading(true);

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            setStatus(`Laddar upp ${i + 1}/${files.length}...`);

            const upload = await uploadFile({

                bucket: "slides",

                folder: `lecture-${lectureId}`,

                file

            });

            if (!upload) continue;

            await createSlide({

                title: cleanTitle(file.name),

                image_url: upload.publicUrl,

                lecture_id: Number(lectureId)

            });

        }

        setStatus("");

        setUploading(false);

        event.target.value = "";

        refresh?.();

    }

    return (

        <div style={{ marginBottom: 30 }}>

            <AdminSelect

                label="Föreläsning slidesen hör till"

                value={lectureId}

                onChange={e => setLectureId(e.target.value)}

                options={lectures}

                labelField="title"

            />

            <input

                type="file"

                accept="image/*"

                multiple

                disabled={uploading}

                onChange={handleFiles}

            />

            {

                uploading &&

                <p>{status || "Laddar upp..."}</p>

            }

        </div>

    );

}

export default AdminSlideUpload;
