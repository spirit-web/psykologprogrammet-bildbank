import { useParams } from "react-router-dom";

import "./CoursePage.css";

import BackButton from "../../components/BackButton/BackButton";
import ImageViewer from "../../components/ImageGallery/ImageViewer";
import CourseHeader from "../../components/CourseHeader/CourseHeader";
import CourseSections from "../../components/CourseSections/CourseSections";

import useCourse from "../../hooks/useCourse";
import useCourseSlides from "../../hooks/useCourseSlides";

function CourseSlidesPage() {

    const { id } = useParams();

    const { course, loading: courseLoading } = useCourse(id);

    const { slides, loading } = useCourseSlides(id);

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

            <h1 style={{ fontSize: 32, lineHeight: 1.3, margin: "0 0 8px" }}>📄 Originalslides — {course?.name}</h1>

            <p>Slidesen som psykologverktygs-bilderna i den här kursen är skapade utifrån.</p>

            <ImageViewer

                images={slides}

                loading={loading}

                showActions={false}

                emptyMessage="Inga originalslides uppladdade för den här kursens föreläsningar än."

                layout="browse"

            />

        </div>

    );

}

export default CourseSlidesPage;
