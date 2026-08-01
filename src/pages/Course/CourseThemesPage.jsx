import { useEffect, useState } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";
import "../../components/CourseSections/CourseSections.css";

import useCourse from "../../hooks/useCourse";

import {
    getCourseThemes,
    getCourseImagesByTheme
} from "../../services/themes";

function CourseThemesPage() {

    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();

    const { course } = useCourse(id);

    const [themes, setThemes] = useState([]);

    const [selectedThemeId, setSelectedThemeId] = useState(searchParams.get("tema") || null);

    const [images, setImages] = useState([]);

    const [loadingImages, setLoadingImages] = useState(false);

    useEffect(() => {

        if (id) {

            getCourseThemes(id).then(setThemes);

        }

    }, [id]);

    useEffect(() => {

        async function load() {

            if (!selectedThemeId) return;

            setLoadingImages(true);

            const data = await getCourseImagesByTheme(id, selectedThemeId);

            setImages(data);

            setLoadingImages(false);

        }

        load();

    }, [id, selectedThemeId]);

    function openTheme(themeId) {

        setSelectedThemeId(themeId);

        setSearchParams({ tema: themeId });

    }

    function backToThemes() {

        setSelectedThemeId(null);

        setSearchParams({});

    }

    const selectedTheme = themes.find(theme => theme.id === Number(selectedThemeId));

    return (

        <>

            <Navbar />

            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>🧠 Begrepp — {course?.name}</h1>

                <p>Teman med taggade bilder i den här kursen.</p>

                {

                    !selectedThemeId &&

                    <div className="section-grid">

                        {

                            themes.length === 0 &&

                            <p>Inga taggade bilder i den här kursen än — öppna en bild och klicka 🏷️ Teman.</p>

                        }

                        {

                            themes.map(theme => (

                                <div

                                    key={theme.id}

                                    className="section-card"

                                    style={{ cursor: "pointer" }}

                                    onClick={() => openTheme(theme.id)}

                                >

                                    <h1>{theme.icon}</h1>

                                    <h3>{theme.name}</h3>

                                </div>

                            ))

                        }

                    </div>

                }

                {

                    selectedThemeId &&

                    <>

                        <button onClick={backToThemes} style={{ marginBottom: 20 }}>

                            ← Alla teman

                        </button>

                        {

                            selectedTheme &&

                            <h2>{selectedTheme.icon} {selectedTheme.name}</h2>

                        }

                        <ImageViewer

                            images={images}

                            loading={loadingImages}

                            emptyMessage="Inga bilder taggade med det här temat i den här kursen."

                            onDeleted={imageId => setImages(current => current.filter(image => image.id !== imageId))}

                        />

                    </>

                }

            </div>

        </>

    );

}

export default CourseThemesPage;
