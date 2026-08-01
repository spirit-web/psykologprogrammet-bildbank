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

border: slide.lecture_id ? "1px solid #ddd" : "2px solid #f0b429",

padding:"20px",

marginBottom:"20px",

borderRadius:"12px",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<div style={{ display:"flex", gap:15, alignItems:"center" }}>

{

    slide.image_url &&

    <img

        src={slide.image_url}

        alt={slide.title}

        style={{

            width:70,

            height:50,

            objectFit:"cover",

            borderRadius:8,

            background:"#eef1f6"

        }}

    />

}

<div>

<h3>

{slide.title || `Slide ${slide.page_number ?? ""}`}

</h3>

<p>

📚 {slide.lectures?.title ?? "⚠️ Ingen föreläsning kopplad"}

</p>

</div>

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