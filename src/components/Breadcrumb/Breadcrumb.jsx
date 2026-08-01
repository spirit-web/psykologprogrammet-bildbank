import { Link } from "react-router-dom";

import "./Breadcrumb.css";

function Breadcrumb({items}){

return(

<div className="breadcrumb">

<Link to="/">

Psykologprogrammet

</Link>

{

items?.map(item=>(

<span key={item.label}>

{" > "}

{item.link?

<Link to={item.link}>

{item.label}

</Link>

:

item.label

}

</span>

))

}

</div>

)

}

export default Breadcrumb;