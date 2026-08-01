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
      >

        {
          course.cover &&
          <img
            src={course.cover}
            alt={course.name}
            className="course-cover"
          />
        }

        <div className="course-content">

          <h3>{course.name}</h3>

          <p className="teacher">
            👨‍🏫 {course.teacher}
          </p>

          <p>
            {course.description}
          </p>

          <p>
            🎓 {course.credits} hp
          </p>

          <div
            style={{
              background:"#16386B",
              color:"white",
              padding:"12px",
              borderRadius:"10px",
              textAlign:"center",
              marginTop:"20px",
              fontWeight:"600"
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