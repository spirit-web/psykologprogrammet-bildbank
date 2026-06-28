import "./CourseGrid.css";

import CourseCard from "./CourseCard";

import { demoCourses } from "../../data/demoCourses";

function CourseGrid({ selectedTerm }) {

  return (

    <div className="course-grid">

      {

        demoCourses

          .filter(course => course.term === selectedTerm)

          .map(course => (

            <CourseCard
              key={course.id}
              course={course}
            />

          ))

      }

    </div>

  );

}

export default CourseGrid;