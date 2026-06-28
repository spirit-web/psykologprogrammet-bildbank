import "./Stats.css";

function Stats({ course }) {

    return (

        <div className="stats">

            <div className="stat-card">

                <h2>{course.lectures}</h2>

                <p>Föreläsningar</p>

            </div>

            <div className="stat-card">

                <h2>{course.images}</h2>

                <p>Bilder</p>

            </div>

            <div className="stat-card">

                <h2>{course.credits}</h2>

                <p>Högskolepoäng</p>

            </div>

        </div>

    );

}

export default Stats;