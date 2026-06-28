import "./CourseHeader.css";

function CourseHeader({ course }) {

    return (

        <div className="course-header">

            <img

                src={course.cover}

                alt={course.name}

                className="course-cover-large"

            />

            <div className="course-header-info">

                <h1>{course.name}</h1>

                <p>👨‍🏫 {course.teacher}</p>

                <p>{course.credits}</p>

                <p>{course.description}</p>

            </div>

        </div>

    );

}

export default CourseHeader;