import "./Hero.css";

import { education } from "../../data/demoEducation";

function Hero(){

return(

<section className="hero">

<h2>

{education.name}

</h2>

<p>

{education.university}

</p>

<p>

{education.years} år • {education.terms} terminer

</p>

</section>

);

}

export default Hero;