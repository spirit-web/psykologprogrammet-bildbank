import AdminSection from "./AdminSection";

function SlideList({

slides=[],

onDelete,

onEdit

}){

return(

<AdminSection title="📑 Alla slides">

{

slides.length===0&&

<p>

Inga slides ännu.

</p>

}

{

slides.map(slide=>

<div

key={slide.id}

style={{

border:"1px solid #ddd",

padding:"20px",

marginBottom:"20px",

borderRadius:"12px",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<div>

<h3>

Slide {slide.page_number}

</h3>

<p>

Lecture {slide.lecture_id}

</p>

</div>

<div>

<button

onClick={()=>onEdit(slide)}

>

✏️

</button>

<button

onClick={()=>onDelete(slide.id)}

>

🗑

</button>

</div>

</div>

)

}

</AdminSection>

)

}

export default SlideList;