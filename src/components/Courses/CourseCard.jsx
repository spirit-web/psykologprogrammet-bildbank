import { Link } from "react-router-dom";

import "./CourseGrid.css";

function CourseCard({ course }) {

  return (

    <Link
      to={`/course/${course.id}`}
      style={{ textDecoration: "none" }}
    >

      <div
        className="course-card"
        style={{
          borderTop: `8px solid ${course.color}`
        }}
      >

        <img
          src={course.cover}
          alt={course.name}
          className="course-cover"
        />

        <div className="course-content">

          <h3>{course.name}</h3>

          <p className="teacher">

            👨‍🏫 {course.teacher}

          </p>

          <div className="course-stats">

            <span>📄 {course.lectures}</span>

            <span>🖼️ {course.images}</span>

          </div>

          <div
            style={{
              background: "red",
              color: "white",
              padding: "12px",
              textAlign: "center",
              borderRadius: "8px"
            }}
          >
            Öppna kurs
          </div>

        </div>

      </div>

    </Link>

  );

}

export default CourseCard;