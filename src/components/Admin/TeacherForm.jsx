import { useState } from "react";

import { createTeacher, setTeacherCourses } from "../../services/adminDatabase";
import { uploadFile } from "../../services/storage/storage";
import useAdminData from "../../hooks/useAdminData";

function TeacherForm({ refresh }) {

    const { courses } = useAdminData();

    const [name, setName] = useState("");

    const [image, setImage] = useState("");

    const [bio, setBio] = useState("");

    const [courseIds, setCourseIds] = useState([]);

    const [primaryCourseId, setPrimaryCourseId] = useState(null);

    const [uploading, setUploading] = useState(false);

    const [saving, setSaving] = useState(false);

    function toggleCourse(courseId) {

        setCourseIds(current => {

            const next = current.includes(courseId)

                ? current.filter(id => id !== courseId)

                : [...current, courseId];

            if (!next.includes(courseId) && primaryCourseId === courseId) {

                setPrimaryCourseId(null);

            }

            return next;

        });

    }

    async function handlePhoto(event) {

        const file = event.target.files[0];

        if (!file) return;

        setUploading(true);

        const upload = await uploadFile({

            bucket: "images",

            folder: "teachers",

            file

        });

        setUploading(false);

        if (upload) {

            setImage(upload.publicUrl);

        }

    }

    async function save() {

        if (!name.trim()) {

            alert("Ange lärarens namn.");

            return;

        }

        setSaving(true);

        const created = await createTeacher({

            name,

            image_url: image,

            bio

        });

        if (created) {

            await setTeacherCourses(created.id, courseIds, primaryCourseId);

            setName("");

            setImage("");

            setBio("");

            setCourseIds([]);

            setPrimaryCourseId(null);

            refresh?.();

        }

        setSaving(false);

    }

    return (

        <div>

            <h2>

                Ny lärare

            </h2>

            <input

                placeholder="Namn"

                value={name}

                onChange={e => setName(e.target.value)}

            />

            <br /><br />

            <input

                type="file"

                accept="image/*"

                onChange={handlePhoto}

            />

            {

                uploading &&

                <p>Laddar upp bild...</p>

            }

            {

                image &&

                <img

                    src={image}

                    alt="Förhandsvisning"

                    style={{

                        width: 70,

                        height: 70,

                        borderRadius: "50%",

                        objectFit: "cover",

                        marginTop: 10

                    }}

                />

            }

            <br /><br />

            <textarea

                rows="4"

                placeholder="Kort presentation"

                value={bio}

                onChange={e => setBio(e.target.value)}

            />

            <br /><br />

            <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>

                Undervisar på kurser (klicka ⭐ för att markera huvudlärare):

            </label>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 15 }}>

                {

                    courses.map(course => (

                        <span

                            key={course.id}

                            style={{

                                display: "flex",

                                alignItems: "center",

                                gap: 6,

                                background: courseIds.includes(course.id) ? "#214c9d" : "#f0f0f0",

                                color: courseIds.includes(course.id) ? "white" : "#333",

                                padding: "8px 14px",

                                borderRadius: 20,

                                fontSize: 14

                            }}

                        >

                            <label

                                style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}

                            >

                                <input

                                    type="checkbox"

                                    checked={courseIds.includes(course.id)}

                                    onChange={() => toggleCourse(course.id)}

                                    style={{ display: "none" }}

                                />

                                {course.name}

                            </label>

                            {

                                courseIds.includes(course.id) &&

                                <button

                                    type="button"

                                    onClick={() => setPrimaryCourseId(

                                        primaryCourseId === course.id ? null : course.id

                                    )}

                                    title="Markera som huvudlärare"

                                    style={{

                                        background: "none",

                                        border: "none",

                                        cursor: "pointer",

                                        fontSize: 15,

                                        opacity: primaryCourseId === course.id ? 1 : 0.4

                                    }}

                                >

                                    ⭐

                                </button>

                            }

                        </span>

                    ))

                }

            </div>

            <button

                onClick={save}

                disabled={saving}

            >

                {saving ? "Sparar..." : "Spara lärare"}

            </button>

        </div>

    )

}

export default TeacherForm;
