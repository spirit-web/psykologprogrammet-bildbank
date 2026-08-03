import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminButton from "./AdminButton.jsx";
import EmojiPicker from "./EmojiPicker";

import { createCase } from "../../services/cases";

function CaseForm({ refresh }) {

    const [name, setName] = useState("");

    const [occupation, setOccupation] = useState("");

    const [category, setCategory] = useState("");

    const [description, setDescription] = useState("");

    const [avatar, setAvatar] = useState("🧑");

    async function save() {

        if (!name.trim()) {

            alert("Skriv in ett namn på personen.");

            return;

        }

        const created = await createCase({

            name,

            occupation,

            category,

            description,

            avatar

        });

        if (created) {

            setName("");
            setOccupation("");
            setCategory("");
            setDescription("");
            setAvatar("🧑");

            refresh?.();

        }

    }

    return (

        <AdminSection title="🩺 Nytt fall">

            <AdminInput
                placeholder="Namn (t.ex. Emma, 23 år)"
                value={name}
                onChange={event => setName(event.target.value)}
            />

            <AdminInput
                placeholder="Sysselsättning"
                value={occupation}
                onChange={event => setOccupation(event.target.value)}
            />

            <AdminInput
                placeholder="Kategori/diagnos (t.ex. Ångestsyndrom)"
                value={category}
                onChange={event => setCategory(event.target.value)}
            />

            <EmojiPicker value={avatar} onChange={setAvatar} />

            <AdminTextarea
                placeholder="Beskrivning av fallet"
                value={description}
                onChange={event => setDescription(event.target.value)}
            />

            <AdminButton onClick={save}>
                💾 Spara fall
            </AdminButton>

        </AdminSection>

    );

}

export default CaseForm;
