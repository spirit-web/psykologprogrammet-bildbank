import { useParams } from "react-router-dom";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";

import useCourse from "../../hooks/useCourse";
import useCourseImages from "../../hooks/useCourseImages";

function CourseImagesPage() {

    const { id } = useParams();

    const { course } = useCourse(id);

    const { images, loading, removeImage } = useCourseImages(id);

    return (

        <>
            <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

                <BackButton />

                <h1 style={{ fontSize: 32, lineHeight: 1.3, margin: "20px 0 8px" }}>🔧 Bilder — {course?.name}</h1>

                <p>Alla minnesbilder från kursens föreläsningar, samlade på ett ställe.</p>

                <ImageViewer

                    images={images}

                    loading={loading}

                    emptyMessage="Inga bilder kopplade till en föreläsning i den här kursen än."

                    onDeleted={removeImage}

                />

            </div>

        </>

    );

}

export default CourseImagesPage;
