import "./SlideViewer.css";

function SlideViewer({image}){

return(

<div className="slide-viewer">

<img

src={image}

alt="slide"

/>

</div>

);

}

export default SlideViewer;