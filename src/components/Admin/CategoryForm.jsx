import { useState } from "react";

import AdminSection from "./AdminSection";
import AdminInput from "./AdminInput";
import AdminButton from "./AdminButton.jsx";
import EmojiPicker from "./EmojiPicker";

import { createTheme } from "../../services/themes";

function CategoryForm({ refresh }) {

    const [name, setName] = useState("");

    const [icon, setIcon] = useState("🧠");

    async function saveCategory() {

        if (!name.trim()) {

            alert("Skriv in ett namn på kategorin.");

            return;

        }

        const created = await createTheme(name, icon);

        if (created) {

            setName("");

            setIcon("🧠");

            refresh?.();

        }

    }

    return (

        <AdminSection title="🧠 Nytt tema">

            <AdminInput

                placeholder="Temanamn"

                value={name}

                onChange={event => setName(event.target.value)}

            />

            <EmojiPicker value={icon} onChange={setIcon} />

            <AdminButton onClick={saveCategory}>

                💾 Spara kategori

            </AdminButton>

        </AdminSection>

    );

}

export default CategoryForm;
