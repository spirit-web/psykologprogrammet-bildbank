import "./CourseSections.css";

function CourseSections() {

    const sections = [

        {
            icon:"📚",
            title:"Föreläsningar",
            text:"Visa alla föreläsningar"
        },

        {
            icon:"🖼️",
            title:"Bilder",
            text:"Alla AI-bilder"
        },

        {
            icon:"🧠",
            title:"Begrepp",
            text:"Psykologiska koncept"
        },

        {
            icon:"📄",
            title:"PDF",
            text:"Originalföreläsningar"
        }

    ];

    return(

        <div className="section-grid">

            {

                sections.map(section=>(

                    <div
                        key={section.title}
                        className="section-card"
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