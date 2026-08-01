import { useState } from "react";

import { createTeacher, setTeacherCourses } from "../../services/adminDatabase";
import { uploadFile } from "../../services/storage/storage";
import useAdminData from "../../hooks/useAdminData";

function TeacherForm({ refresh }) {

    const { courses } = useAdminData();

    const [name, setName] = useState("");

    const [title, setTitle] = useState("");

    const [email, setEmail] = useState("");

    const [image, setImage] = useState("");

    const [bio, setBio] = useState("");

    const [courseIds, setCourseIds] = useState([]);

    const [uploading, setUploading] = useState(false);

    const [saving, setSaving] = useState(false);

    function toggleCourse(courseId) {

        setCourseIds(current =>

            current.includes(courseId)

                ? current.filter(id => id !== courseId)

                : [...current, courseId]

        );

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

            title,

            email,

            image_url: image,

            bio

        });

        if (created) {

            await setTeacherCourses(created.id, courseIds);

            setName("");

            setTitle("");

            setEmail("");

            setImage("");

            setBio("");

            setCourseIds([]);

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

                placeholder="Titel"

                value={title}

                onChange={e => setTitle(e.target.value)}

            />

            <br /><br />

            <input

                placeholder="Email"

                value={email}

                onChange={e => setEmail(e.target.value)}

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

                Undervisar på kurser:

            </label>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 15 }}>

                {

                    courses.map(course => (

                        <label

                            key={course.id}

                            style={{

                                display: "flex",

                                alignItems: "center",

                                gap: 6,

                                background: courseIds.includes(course.id) ? "#214c9d" : "#f0f0f0",

                                color: courseIds.includes(course.id) ? "white" : "#333",

                                padding: "8px 14px",

                                borderRadius: 20,

                                cursor: "pointer",

                                fontSize: 14

                            }}

                        >

                            <input

                                type="checkbox"

                                checked={courseIds.includes(course.id)}

                                onChange={() => toggleCourse(course.id)}

                                style={{ display: "none" }}

                            />

                            {course.name}

                        </label>

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
