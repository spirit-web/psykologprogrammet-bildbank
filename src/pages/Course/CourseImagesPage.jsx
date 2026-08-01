import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";

import useCourse from "../../hooks/useCourse";
import useCourseImages from "../../hooks/useCourseImages";

function CourseImagesPage() {

    const { id } = useParams();

    const { course } = useCourse(id);

    const { images, loading } = useCourseImages(id);

    return (

        <>

            <Navbar />

            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1>🖼 Alla bilder — {course?.name}</h1>

                <p>Alla minnesbilder från kursens föreläsningar, samlade på ett ställe.</p>

                <ImageViewer

                    images={images}

                    loading={loading}

                    emptyMessage="Inga bilder kopplade till en föreläsning i den här kursen än."

                />

            </div>

        </>

    );

}

export default CourseImagesPage;
