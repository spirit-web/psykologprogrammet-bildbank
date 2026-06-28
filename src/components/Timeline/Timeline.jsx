import "./Timeline.css";

import { demoTerms } from "../../data/demoTerms";

function Timeline({selectedTerm,setSelectedTerm}){

return(

<div className="timeline">

{

demoTerms.map(term=>(

<div
    key={term.id}
    className="timeline-item"
    onClick={() => setSelectedTerm(term.id)}
    style={{
        background: term.color,
        opacity: selectedTerm === term.id ? 1 : 0.35
    }}
>

{term.title}

</div>

))

}

</div>

);

}

export default Timeline;