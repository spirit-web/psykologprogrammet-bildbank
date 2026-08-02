import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminButton from "./AdminButton.jsx";

import { createLecture } from "../../services/adminDatabase";
import { uploadFile } from "../../services/storage/storage";

import useAdminData from "../../hooks/useAdminData";
import AdminSelect from "./AdminSelect";

function LectureForm({ refresh }) {

    const [title, setTitle] = useState("");

    const [courseId, setCourseId] = useState(1);
    const { courses } = useAdminData();

    const [teacher, setTeacher] = useState("");

    const [pdfUrl, setPdfUrl] = useState("");

    const [uploading, setUploading] = useState(false);

    async function handleFile(event) {

        const file = event.target.files[0];

        if (!file) return;

        setUploading(true);

        const upload = await uploadFile({

            bucket: "slides",

            folder: `kurs-${courseId}`,

            file

        });

        setUploading(false);

        if (upload) {

            setPdfUrl(upload.publicUrl);

        }

    }

    async function save() {

        const result = await createLecture({

            title,

            course_id: Number(courseId),

            teacher,

            pdf_url: pdfUrl || null

        });

        if (!result) {

            return;

        }

        setTitle("");

        setCourseId(1);

        setTeacher("");

        setPdfUrl("");

        if (refresh) {

            refresh();

        }

    }

    return (

        <AdminSection

            title="🎓 Ny föreläsning"

        >

            <AdminInput

                placeholder="Titel"

                value={title}

                onChange={e=>setTitle(e.target.value)}

            />

            <AdminSelect
            label="Kurs"
            value={courseId}
            onChange={e=>setCourseId(e.target.value)}
            options={courses}
            />

            <AdminInput

                placeholder="Lärare"

                value={teacher}

                onChange={e=>setTeacher(e.target.value)}

            />

            <label style={{ display: "block", fontWeight: 600, margin: "0 0 8px" }}>

                Originalmaterial (PDF) — valfritt

            </label>

            {

                pdfUrl &&

                <p style={{ marginBottom: 10 }}>

                    📄 <a href={pdfUrl} target="_blank" rel="noreferrer">Fil uppladdad</a>

                </p>

            }

            <input

                type="file"

                accept=".pdf,.pptx,image/*"

                onChange={handleFile}

                disabled={uploading}

            />

            {

                uploading &&

                <p>Laddar upp...</p>

            }

            <br /><br />

            <AdminButton

                onClick={save}

            >

                💾 Spara föreläsning

            </AdminButton>

        </AdminSection>

    );

}

export default LectureForm;