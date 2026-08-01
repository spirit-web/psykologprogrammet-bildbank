import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";

import useCourse from "../../hooks/useCourse";
import useLectures from "../../hooks/useLectures";

function CourseSlidesPage() {

    const { id } = useParams();

    const { course } = useCourse(id);

    const { lectures, loading } = useLectures(id);

    const lecturesWithFiles = lectures.filter(lecture => lecture.pdf_url);

    return (

        <>

            <Navbar />

            <div style={{ maxWidth: "900px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>📄 Originalföreläsningar — {course?.name}</h1>

                <p>Föreläsningars ursprungliga PDF/PPTX-material.</p>

                {

                    loading &&

                    <p>Laddar...</p>

                }

                {

                    !loading && lecturesWithFiles.length === 0 &&

                    <p>Inget originalmaterial uppladdat för den här kursens föreläsningar än.</p>

                }

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                    {

                        lecturesWithFiles.map(lecture => (

                            <a

                                key={lecture.id}

                                href={lecture.pdf_url}

                                target="_blank"

                                rel="noreferrer"

                                style={{

                                    display: "block",

                                    padding: "16px 20px",

                                    background: "white",

                                    borderRadius: 12,

                                    boxShadow: "0 4px 15px rgba(0,0,0,.06)",

                                    textDecoration: "none",

                                    color: "#214c9d",

                                    fontWeight: 600

                                }}

                            >

                                📄 {lecture.title}

                            </a>

                        ))

                    }

                </div>

            </div>

        </>

    );

}

export default CourseSlidesPage;
