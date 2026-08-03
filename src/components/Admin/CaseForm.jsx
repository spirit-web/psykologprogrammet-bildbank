import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminTextarea from "./AdminTextarea";
import AdminButton from "./AdminButton.jsx";

import { createCase } from "../../services/cases";
import { getAvatarUrl, CASE_CATEGORIES } from "../../utils/caseVisuals";

function CaseForm({ refresh }) {

    const [name, setName] = useState("");

    const [occupation, setOccupation] = useState("");

    const [category, setCategory] = useState("");

    const [description, setDescription] = useState("");

    async function save() {

        if (!name.trim()) {

            alert("Skriv in ett namn på personen.");

            return;

        }

        const created = await createCase({

            name,

            occupation,

            category,

            description

        });

        if (created) {

            setName("");
            setOccupation("");
            setCategory("");
            setDescription("");

            refresh?.();

        }

    }

    return (

        <AdminSection title="🩺 Nytt fall">

            {
                name.trim() &&
                <img
                    src={getAvatarUrl(name)}
                    alt="Avatar"
                    style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 15, background: "#f4f4f4" }}
                />
            }

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

            <input
                list="case-categories"
                placeholder="Kategori/diagnos (t.ex. Ångestsyndrom)"
                value={category}
                onChange={event => setCategory(event.target.value)}
                style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 15, fontSize: 15 }}
            />

            <datalist id="case-categories">
                {CASE_CATEGORIES.map(categoryName => <option key={categoryName} value={categoryName} />)}
            </datalist>

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
