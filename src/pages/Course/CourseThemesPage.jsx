import { useParams } from "react-router-dom";

import BackButton from "../../components/BackButton/BackButton";

import useCourse from "../../hooks/useCourse";
import useCourseImages from "../../hooks/useCourseImages";

function CourseThemesPage() {

    const { id } = useParams();

    const { course } = useCourse(id);

    const { images, loading } = useCourseImages(id);

    const sorted = [...images].sort((a, b) =>
        (a.title || "").localeCompare(b.title || "", "sv")
    );

    return (

        <div style={{ maxWidth: "800px", margin: "auto", padding: "40px" }}>

            <BackButton />

            <h1>🧠 Begrepp — {course?.name}</h1>

            <p>Alla koncept som finns representerade i kursens bilder.</p>

            {
                loading &&
                <p>Laddar...</p>
            }

            {
                !loading && sorted.length === 0 &&
                <p>Inga bilder i den här kursen än.</p>
            }

            <ul style={{ listStyle: "none", padding: 0, marginTop: 25 }}>

                {

                    sorted.map(image => (

                        <li

                            key={image.id}

                            style={{

                                padding: "14px 0",

                                borderBottom: "1px solid #eee"

                            }}

                        >

                            <strong>{image.title}</strong>

                            {

                                image.description &&

                                <p style={{ margin: "4px 0 0", color: "#666" }}>

                                    {image.description}

                                </p>

                            }

                        </li>

                    ))

                }

            </ul>

        </div>

    );

}

export default CourseThemesPage;
