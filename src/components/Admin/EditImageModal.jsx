import { useEffect, useState } from "react";

import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminSelect from "./AdminSelect";
import AdminButton from "./AdminButton.jsx";

import { updateImage } from "../../services/adminDatabase";
import { getThemes, getThemesForImage, tagImage, untagImage } from "../../services/themes";

function EditImageModal({ image, lectures, slides, onClose, onSaved }) {

    const [title, setTitle] = useState(image.title ?? "");

    const [lectureId, setLectureId] = useState(image.lecture_id ?? "");

    const [slideId, setSlideId] = useState(image.slide_id ?? "");

    const [description, setDescription] = useState(image.description ?? "");

    const [saving, setSaving] = useState(false);

    const [allThemes, setAllThemes] = useState([]);

    const [taggedThemeIds, setTaggedThemeIds] = useState([]);

    const slidesForLecture = slides.filter(

        slide => !lectureId || slide.lecture_id === Number(lectureId)

    );

    useEffect(() => {

        async function loadThemeData() {

            const [themes, tagged] = await Promise.all([

                getThemes(),

                getThemesForImage(image.id)

            ]);

            setAllThemes(themes);

            setTaggedThemeIds(tagged.map(theme => theme.id));

        }

        loadThemeData();

    }, [image.id]);

    async function toggleTheme(themeId) {

        if (taggedThemeIds.includes(themeId)) {

            setTaggedThemeIds(current => current.filter(id => id !== themeId));

            await untagImage(image.id, themeId);

        } else {

            setTaggedThemeIds(current => [...current, themeId]);

            await tagImage(image.id, themeId);

        }

    }

    async function save() {

        setSaving(true);

        const result = await updateImage(image.id, {

            title,

            lecture_id: lectureId ? Number(lectureId) : null,

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

                <label style={{ display: "block", fontWeight: 600, margin: "15px 0 8px" }}>

                    Kategorier (flera samtidigt)

                </label>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 15 }}>

                    {

                        allThemes.map(theme => (

                            <button

                                type="button"

                                key={theme.id}

                                onClick={() => toggleTheme(theme.id)}

                                style={{

                                    padding: "8px 14px",

                                    borderRadius: 20,

                                    border: "none",

                                    cursor: "pointer",

                                    fontSize: 13,

                                    background: taggedThemeIds.includes(theme.id) ? "#214c9d" : "#eee",

                                    color: taggedThemeIds.includes(theme.id) ? "white" : "#333"

                                }}

                            >

                                {theme.icon} {theme.name}

                            </button>

                        ))

                    }

                </div>

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
