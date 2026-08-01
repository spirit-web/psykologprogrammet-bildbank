import { useState } from "react";

import { createTeacher } from "../../services/adminDatabase";
import { uploadFile } from "../../services/storage/storage";

function TeacherForm({ refresh }) {

    const [name, setName] = useState("");

    const [title, setTitle] = useState("");

    const [email, setEmail] = useState("");

    const [image, setImage] = useState("");

    const [bio, setBio] = useState("");

    const [uploading, setUploading] = useState(false);

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

        const success = await createTeacher({

            name,

            title,

            email,

            image_url: image,

            bio

        });

        if (success) {

            alert("Lärare sparad!");

            setName("");

            setTitle("");

            setEmail("");

            setImage("");

            setBio("");

            refresh?.();

        }

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

            <button

                onClick={save}

            >

                Spara lärare

            </button>

        </div>

    )

}

export default TeacherForm;
