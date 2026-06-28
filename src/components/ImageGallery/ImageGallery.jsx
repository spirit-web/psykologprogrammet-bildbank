import "./ImageGallery.css";

import { demoImages } from "../../data/demoImages";

function ImageGallery({lecture}){

return(

<>

<h2>

🖼 Bildgalleri

</h2>

<div className="gallery-grid">

{

demoImages

.filter(

image=>image.lectureId===lecture.id

)

.map(

image=>

<div

className="gallery-card"

key={image.id}

>

<img

src={image.image}

alt={image.title}

/>

<p>

{image.title}

</p>

</div>

)

}

</div>

</>

)

}

export default ImageGallery;