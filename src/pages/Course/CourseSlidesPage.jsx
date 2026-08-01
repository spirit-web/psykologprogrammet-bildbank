import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";

import useCourse from "../../hooks/useCourse";
import useCourseSlides from "../../hooks/useCourseSlides";

function CourseSlidesPage() {

    const { id } = useParams();

    const { course } = useCourse(id);

    const { slides, loading } = useCourseSlides(id);

    return (

        <>

            <Navbar />

            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>📄 Originalslides — {course?.name}</h1>

                <p>Slidesen som psykologverktygs-bilderna i den här kursen är skapade utifrån.</p>

                <ImageViewer

                    images={slides}

                    loading={loading}

                    showActions={false}

                    emptyMessage="Inga originalslides uppladdade för den här kursens föreläsningar än."

                />

            </div>

        </>

    );

}

export default CourseSlidesPage;
