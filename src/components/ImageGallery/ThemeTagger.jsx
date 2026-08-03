import { useEffect, useState } from "react";

import {
    getThemes,
    getThemesForImage,
    createTheme,
    tagImage,
    untagImage
} from "../../services/themes";

function ThemeTagger({ imageId }) {

    const [open, setOpen] = useState(false);

    const [allThemes, setAllThemes] = useState([]);

    const [taggedIds, setTaggedIds] = useState([]);

    const [newThemeName, setNewThemeName] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (open) {

            loadData();

        }

    }, [open, imageId]);

    async function loadData() {

        setLoading(true);

        const [themes, tagged] = await Promise.all([

            getThemes(),

            getThemesForImage(imageId)

        ]);

        setAllThemes(themes);

        setTaggedIds(tagged.map(theme => theme.id));

        setLoading(false);

    }

    async function toggle(themeId) {

        if (taggedIds.includes(themeId)) {

            setTaggedIds(current => current.filter(id => id !== themeId));

            await untagImage(imageId, themeId);

        } else {

            setTaggedIds(current => [...current, themeId]);

            await tagImage(imageId, themeId);

        }

        window.dispatchEvent(new Event("psykopedia-themes-changed"));

    }

    async function addNewTheme() {

        const name = newThemeName.trim();

        if (!name) return;

        const created = await createTheme(name);

        if (!created) return;

        setAllThemes(current => [...current, created]);

        setTaggedIds(current => [...current, created.id]);

        await tagImage(imageId, created.id);

        setNewThemeName("");

        window.dispatchEvent(new Event("psykopedia-themes-changed"));

    }

    return (

        <div className="theme-tagger">

            <button onClick={() => setOpen(!open)} title="Kategorier">

                🏷️{taggedIds.length > 0 ? ` ${taggedIds.length}` : ""}

            </button>

            {
                open &&
                <div className="theme-tagger-popover">

                    {
                        loading
                            ? <p>Laddar...</p>
                            : <div className="theme-chip-list">

                                {
                                    allThemes.map(theme => (

                                        <button

                                            key={theme.id}

                                            className={

                                                taggedIds.includes(theme.id)

                                                    ? "theme-chip active"

                                                    : "theme-chip"

                                            }

                                            onClick={() => toggle(theme.id)}

                                        >

                                            {theme.icon} {theme.name}

                                        </button>

                                    ))
                                }

                            </div>
                    }

                    <div className="theme-tagger-new">

                        <input

                            placeholder="+ Ny kategori"

                            value={newThemeName}

                            onChange={event => setNewThemeName(event.target.value)}

                            onKeyDown={event => {

                                if (event.key === "Enter") {

                                    addNewTheme();

                                }

                            }}

                        />

                        <button onClick={addNewTheme}>

                            Lägg till

                        </button>

                    </div>

                </div>
            }

        </div>

    );

}

export default ThemeTagger;
