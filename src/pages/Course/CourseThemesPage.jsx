import { useState } from "react";

import { useParams } from "react-router-dom";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";

import useCourse from "../../hooks/useCourse";
import useCourseImages from "../../hooks/useCourseImages";

function CourseThemesPage() {

    const { id } = useParams();

    const { course } = useCourse(id);

    const { images, loading } = useCourseImages(id);

    const [lightboxId, setLightboxId] = useState(null);

    const sorted = [...images].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "sv")
    );

    return (

        <div style={{ maxWidth: "800px", margin: "auto", padding: "40px" }}>

            <BackButton />

            <h1 style={{ fontSize: 32, lineHeight: 1.3, margin: "20px 0 8px" }}>🧠 Begrepp — {course?.name}</h1>

            <p>Alla koncept som finns representerade i kursens bilder.</p>

            {
                loading &&
                <p>Laddar...</p>
            }

            {
                !loading && sorted.length === 0 &&
                <p>Inga bilder i den här kursen än.</p>
            }

            <ol style={{ listStyle: "none", padding: 0, marginTop: 25, counterReset: "concept" }}>

                {

                    sorted.map((image, index) => (

                        <li

                            key={image.id}

                            style={{

                                display: "flex",

                                alignItems: "center",

                                gap: 14,

                                padding: "12px 0",

                                borderBottom: "1px solid #eee"

                            }}

                        >

                            <span style={{ width: 24, textAlign: "right", color: "#999", flexShrink: 0 }}>

                                {index + 1}.

                            </span>

                            {

                                image.image_url &&

                                <img

                                    src={image.image_url}

                                    alt={image.title}

                                    onClick={() => setLightboxId(image.id)}

                                    style={{

                                        width: 48,

                                        height: 48,

                                        objectFit: "cover",

                                        borderRadius: 6,

                                        cursor: "pointer",

                                        flexShrink: 0,

                                        background: "#eef1f6"

                                    }}

                                />

                            }

                            <div style={{ textAlign: "left" }}>

                                <strong>{image.title}</strong>

                                {

                                    image.description &&

                                    <p style={{ margin: "2px 0 0", color: "#888" }}>

                                        {image.description}

                                    </p>

                                }

                            </div>

                        </li>

                    ))

                }

            </ol>

            {

                lightboxId &&

                <ImageViewer

                    images={sorted}

                    hideGrid

                    startId={lightboxId}

                    onCloseLightbox={() => setLightboxId(null)}

                />

            }

        </div>

    );

}

export default CourseThemesPage;
