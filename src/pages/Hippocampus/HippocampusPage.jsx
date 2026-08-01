import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";
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

    async function addTheme() {

        const name = newThemeName.trim();

        if (!name) return;

        const created = await createTheme(name);

        if (created) {

            setThemes(current => [...current, created]);

            setNewThemeName("");

        }

    }

    return (

        <>

            <Navbar />

            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>🦭 Hippocampus</h1>

                <p>Bläddra bilder per psykologiskt tema, oavsett vilken kurs de kommer ifrån.</p>

                {

                    !selectedTheme &&

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

                        <div style={{ display: "flex", gap: 10, marginTop: 25, maxWidth: 400 }}>

                            <input

                                placeholder="+ Nytt tema"

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

                                Lägg till tema

                            </button>

                        </div>

                    </>

                }

                {

                    selectedTheme &&

                    <>

                        <button

                            onClick={() => setSelectedTheme(null)}

                            style={{ marginBottom: 20 }}

                        >

                            ← Alla teman

                        </button>

                        <h2>{selectedTheme.icon} {selectedTheme.name}</h2>

                        <ImageViewer

                            images={images}

                            loading={loadingImages}

                            emptyMessage="Inga bilder taggade med det här temat än — öppna en bild och klicka 🏷️ Teman för att koppla den hit."

                        />

                    </>

                }

            </div>

        </>

    );

}

export default HippocampusPage;
