import { useState } from "react";

import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminSelect from "./AdminSelect";
import AdminButton from "./AdminButton.jsx";

import { updateImage } from "../../services/adminDatabase";

function EditImageModal({ image, lectures, categories, slides, onClose, onSaved }) {

    const [title, setTitle] = useState(image.title ?? "");

    const [lectureId, setLectureId] = useState(image.lecture_id ?? "");

    const [categoryId, setCategoryId] = useState(image.category_id ?? "");

    const [slideId, setSlideId] = useState(image.slide_id ?? "");

    const [description, setDescription] = useState(image.description ?? "");

    const [saving, setSaving] = useState(false);

    const slidesForLecture = slides.filter(

        slide => !lectureId || slide.lecture_id === Number(lectureId)

    );

    async function save() {

        setSaving(true);

        const result = await updateImage(image.id, {

            title,

            lecture_id: lectureId ? Number(lectureId) : null,

            category_id: categoryId ? Number(categoryId) : null,

            slide_id: slideId ? Number(slideId) : null,

            description

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

                    ✏️ Redigera bild

                </h2>

                {

                    image.image_url &&

                    <img

                        src={image.image_url}

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

                    onChange={e => {

                        setLectureId(e.target.value);

                        setSlideId("");

                    }}

                    options={lectures}

                    labelField="title"

                />

                <AdminSelect

                    label="Originalslide"

                    value={slideId}

                    onChange={e => setSlideId(e.target.value)}

                    options={slidesForLecture}

                    labelField="title"

                />

                <AdminSelect

                    label="Kategori/Tema"

                    value={categoryId}

                    onChange={e => setCategoryId(e.target.value)}

                    options={categories}

                />

                <AdminTextarea

                    placeholder="Beskrivning"

                    value={description}

                    onChange={e => setDescription(e.target.value)}

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

export default EditImageModal;
