import { useEffect, useState } from "react";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";
import EmojiPicker from "../../components/Admin/EmojiPicker";
import HippocampusCases from "./HippocampusCases";
import "../../components/CourseSections/CourseSections.css";

import {
    getThemes,
    getImagesByTheme,
    createTheme
} from "../../services/themes";

function HippocampusPage() {

    const [themes, setThemes] = useState([]);

    const [selectedTheme, setSelectedTheme] = useState(null);

    const [images, setImages] = useState([]);

    const [loadingImages, setLoadingImages] = useState(false);

    const [newThemeName, setNewThemeName] = useState("");

    const [newThemeIcon, setNewThemeIcon] = useState("🧠");

    const [view, setView] = useState("categories");

    useEffect(() => {

        loadThemes();

    }, []);

    async function loadThemes() {

        const data = await getThemes();

        setThemes(data);

    }

    async function openTheme(theme) {

        setSelectedTheme(theme);

        setLoadingImages(true);

        const data = await getImagesByTheme(theme.id);

        setImages(data);

        setLoadingImages(false);

    }

    const themeIndex = selectedTheme

        ? themes.findIndex(theme => theme.id === selectedTheme.id)

        : -1;

    function openThemeAt(index) {

        if (index < 0 || index >= themes.length) return;

        openTheme(themes[index]);

    }

    async function addTheme() {

        const name = newThemeName.trim();

        if (!name) return;

        const created = await createTheme(name, newThemeIcon);

        if (created) {

            setThemes(current => [...current, created]);

            setNewThemeName("");

            setNewThemeIcon("🧠");

        }

    }

    return (

        <>
            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>🦭 Hippocampus</h1>

                <p>Bläddra bilder per kategori, oavsett vilken kurs de kommer ifrån.</p>

                <div className="gallery-tabs" style={{ marginBottom: 25 }}>

                    <button
                        className={view === "categories" ? "gallery-tab active" : "gallery-tab"}
                        onClick={() => setView("categories")}
                    >
                        🧠 Kategorier
                    </button>

                    <button
                        className={view === "cases" ? "gallery-tab active" : "gallery-tab"}
                        onClick={() => setView("cases")}
                    >
                        🩺 Fall
                    </button>

                </div>

                {view === "cases" && <HippocampusCases />}

                {

                    view === "categories" && !selectedTheme &&

                    <>

                        <div className="section-grid">

                            {

                                themes.map(theme => (

                                    <div

                                        key={theme.id}

                                        className="section-card"

                                        style={{ cursor: "pointer" }}

                                        onClick={() => openTheme(theme)}

                                    >

                                        <h1>{theme.icon}</h1>

                                        <h3>{theme.name}</h3>

                                    </div>

                                ))

                            }

                        </div>

                        <div style={{ maxWidth: 500, marginTop: 25 }}>

                            <EmojiPicker value={newThemeIcon} onChange={setNewThemeIcon} />

                            <div style={{ display: "flex", gap: 10 }}>

                                <input

                                    placeholder="+ Ny kategori"

                                    value={newThemeName}

                                    onChange={event => setNewThemeName(event.target.value)}

                                    onKeyDown={event => {

                                        if (event.key === "Enter") addTheme();

                                    }}

                                    style={{ flex: 1, padding: 12, borderRadius: 10, border: "1px solid #ddd" }}

                                />

                                <button

                                    onClick={addTheme}

                                    style={{ background: "#214c9d", color: "white", border: "none", borderRadius: 10, padding: "0 20px", cursor: "pointer" }}

                                >

                                    Lägg till kategori

                                </button>

                            </div>

                        </div>

                    </>

                }

                {

                    view === "categories" && selectedTheme &&

                    <>

                        <button

                            onClick={() => setSelectedTheme(null)}

                            style={{ marginBottom: 20 }}

                        >

                            ← Alla kategorier

                        </button>

                        <div className="image-navigation">

                            <button

                                onClick={() => openThemeAt(themeIndex - 1)}

                                disabled={themeIndex <= 0}

                            >

                                ⬅ Föregående kategori

                            </button>

                            <span>{selectedTheme.icon} {selectedTheme.name}</span>

                            <button

                                onClick={() => openThemeAt(themeIndex + 1)}

                                disabled={themeIndex === -1 || themeIndex >= themes.length - 1}

                            >

                                Nästa kategori ➡

                            </button>

                        </div>

                        <ImageViewer

                            images={images}

                            loading={loadingImages}

                            emptyMessage="Inga bilder kopplade till den här kategorin än — öppna en bild och klicka 🏷️ för att koppla den hit."

                            onDeleted={imageId => setImages(current => current.filter(image => image.id !== imageId))}

                        />

                    </>

                }

            </div>

        </>

    );

}

export default HippocampusPage;
