import { useState } from "react";

import AdminInput from "./AdminInput";
import AdminSelect from "./AdminSelect";
import AdminButton from "./AdminButton.jsx";

import { updateSlide } from "../../services/adminDatabase";

function EditSlideModal({ slide, lectures, onClose, onSaved }) {

    const [title, setTitle] = useState(slide.title ?? "");

    const [lectureId, setLectureId] = useState(slide.lecture_id ?? "");

    const [pageNumber, setPageNumber] = useState(slide.page_number ?? "");

    const [saving, setSaving] = useState(false);

    async function save() {

        setSaving(true);

        const result = await updateSlide(slide.id, {

            title,

            lecture_id: lectureId ? Number(lectureId) : null,

            page_number: pageNumber ? Number(pageNumber) : null

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

                    ✏️ Redigera slide

                </h2>

                {

                    slide.image_url &&

                    <img

                        src={slide.image_url}

                        alt={title}

                        style={{

                            width: "100%",

                            maxHeight: 200,

                            objectFit: "contain",

                            marginBottom: 15,

                            background: "#eef1f6",

                            borderRadius: 10

                        }}

                    />

                }

                <AdminInput

                    placeholder="Titel"

                    value={title}

                    onChange={e => setTitle(e.target.value)}

                />

                <AdminSelect

                    label="Föreläsning"

                    value={lectureId}

                    onChange={e => setLectureId(e.target.value)}

                    options={lectures}

                    labelField="title"

                />

                <AdminInput

                    placeholder="Sidnummer"

                    value={pageNumber}

                    onChange={e => setPageNumber(e.target.value)}

                />

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>

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

export default EditSlideModal;
