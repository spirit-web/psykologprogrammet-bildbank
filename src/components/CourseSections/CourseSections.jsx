import { useNavigate } from "react-router-dom";

import "./CourseSections.css";

function CourseSections({ courseId }) {

    const navigate = useNavigate();

    const sections = [

        {
            icon:"📚",
            title:"Föreläsningar",
            text:"Visa alla föreläsningar",
            onClick: () => {

                document.getElementById("lectures-section")?.scrollIntoView({ behavior: "smooth" });

            }
        },

        {
            icon:"🔧",
            title:"Alla psykologverktyg",
            text:"Alla bilder i kursen",
            onClick: () => navigate(`/course/${courseId}/bilder`)
        },

        {
            icon:"🧠",
            title:"Begrepp",
            text:"Psykologiska koncept",
            onClick: () => navigate(`/course/${courseId}/begrepp`)
        },

        {
            icon:"📄",
            title:"Originalslides",
            text:"Slides bilderna skapades utifrån",
            onClick: () => navigate(`/course/${courseId}/slides`)
        }

    ];

    return(

        <div className="section-grid">

            {

                sections.map(section=>(

                    <div
                        key={section.title}
                        className="section-card"
                        onClick={section.onClick}
                    >

                        <h1>{section.icon}</h1>

                        <h3>{section.title}</h3>

                        <p>{section.text}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default CourseSections;
