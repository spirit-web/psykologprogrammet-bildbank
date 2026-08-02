import AdminSection from "./AdminSection";

function ImageList({

    images=[],

    onDelete,

    onEdit

}){

const unlinkedCount =
    images.filter(image => !image.lecture_id).length;

return(

<AdminSection title="🖼 Alla bilder">

{

images.length===0&&

<p>

Inga bilder ännu.

</p>

}

{

unlinkedCount > 0 &&

<p style={{ color:"#a45c00", fontWeight:600 }}>

⚠️ {unlinkedCount} bilder saknar föreläsningskoppling — redigera dem nedan.

</p>

}

{

images.map(image=>

<div

key={image.id}

style={{

border: image.lecture_id ? "1px solid #ddd" : "2px solid #f0b429",

borderRadius:"14px",

padding:"20px",

marginBottom:"20px",

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>

<div

    style={{ display:"flex", gap:15, alignItems:"center" }}

>

{

    image.image_url &&

    <img

        src={image.image_url}

        alt={image.title}

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

{image.title}

</h3>

<p>

📚 {image.lectures?.title ?? "⚠️ Ingen föreläsning kopplad"}

</p>

<p>

🧠 {image.categories?.name ?? "Ingen kategori"}

</p>

<p>

📄 {image.original_slides?.title ?? "Ingen koppling till slide"}

</p>

</div>

</div>

<div

style={{

display:"flex",

gap:"10px"

}}

>

<button

onClick={()=>onEdit(image)}

>

✏️

</button>

<button

onClick={()=>onDelete(image.id)}

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

export default ImageList;