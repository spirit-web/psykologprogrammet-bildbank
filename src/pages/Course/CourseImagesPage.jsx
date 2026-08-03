import { useParams } from "react-router-dom";

import "./CoursePage.css";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";
import CourseHeader from "../../components/CourseHeader/CourseHeader";
import CourseSections from "../../components/CourseSections/CourseSections";

import useCourse from "../../hooks/useCourse";
import useCourseImages from "../../hooks/useCourseImages";

function CourseImagesPage() {

    const { id } = useParams();

    const { course, loading: courseLoading } = useCourse(id);

    const { images, loading, removeImage } = useCourseImages(id);

    if (courseLoading) {

        return <h2>Laddar kurs...</h2>;

    }

    if (!course) {

        return <h2>Kursen hittades inte.</h2>;

    }

    return (

        <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

            <BackButton />

            <div className="course-page">

                <CourseHeader course={course} />

                <CourseSections courseId={course.id} />

            </div>

            <h1 style={{ fontSize: 32, lineHeight: 1.3, margin: "0 0 8px" }}>🔧 Bilder — {course?.name}</h1>

            <p>Alla minnesbilder från kursens föreläsningar, samlade på ett ställe.</p>

            <ImageViewer

                images={images}

                loading={loading}

                emptyMessage="Inga bilder kopplade till en föreläsning i den här kursen än."

                onDeleted={removeImage}

                layout="browse"

            />

        </div>

    );

}

export default CourseImagesPage;
