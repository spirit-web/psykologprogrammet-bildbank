import { useState } from "react";

import AdminInput from "./AdminInput";
import AdminSelect from "./AdminSelect";
import AdminButton from "./AdminButton.jsx";

import { updateLecture } from "../../services/adminDatabase";
import { uploadFile } from "../../services/storage/storage";

function EditLectureModal({ lecture, courses, onClose, onSaved }) {

    const [title, setTitle] = useState(lecture.title ?? "");

    const [courseId, setCourseId] = useState(lecture.course_id ?? "");

    const [teacher, setTeacher] = useState(lecture.teacher ?? "");

    const [pdfUrl, setPdfUrl] = useState(lecture.pdf_url ?? "");

    const [saving, setSaving] = useState(false);

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

        setUploading(false);

        if (upload) {

            setPdfUrl(upload.publicUrl);

        }

    }

    async function save() {

        setSaving(true);

        const result = await updateLecture(lecture.id, {

            title,

            course_id: courseId ? Number(courseId) : null,

            teacher,

            pdf_url: pdfUrl || null

        });

        setSaving(false);

        if (!result) {

            return;

        }

        onSaved?.();

        onClose?.();

    }

    return (

        <div

            style={{

                position: "fixed",

                inset: 0,

                background: "rgba(0,0,0,0.5)",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                zIndex: 1000

            }}

            onClick={onClose}

        >

            <div

                style={{

                    background: "white",

                    borderRadius: 18,

                    padding: 35,

                    width: "90%",

                    maxWidth: 500,

                    maxHeight: "85vh",

                    overflowY: "auto"

                }}

                onClick={event => event.stopPropagation()}

            >

                <h2 style={{ marginBottom: 20 }}>

                    ✏️ Redigera föreläsning

                </h2>

                <AdminInput

                    placeholder="Titel"

                    value={title}

                    onChange={e => setTitle(e.target.value)}

                />

                <AdminSelect

                    label="Kurs"

                    value={courseId}

                    onChange={e => setCourseId(e.target.value)}

                    options={courses}

                />

                <AdminInput

                    placeholder="Lärare"

                    value={teacher}

                    onChange={e => setTeacher(e.target.value)}

                />

                <label style={{ display: "block", fontWeight: 600, margin: "15px 0 8px" }}>

                    Originalmaterial (PDF)

                </label>

                {

                    pdfUrl &&

                    <p style={{ marginBottom: 10 }}>

                        📄 <a href={pdfUrl} target="_blank" rel="noreferrer">Nuvarande fil</a>

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

                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

                    <AdminButton onClick={save}>

                        {saving ? "Sparar..." : "💾 Spara ändringar"}

                    </AdminButton>

                    <button

                        onClick={onClose}

                        style={{

                            background: "#eee",

                            border: "none",

                            borderRadius: 10,

                            padding: "12px 20px",

                            cursor: "pointer",

                            fontWeight: 600

                        }}

                    >

                        Avbryt

                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditLectureModal;
