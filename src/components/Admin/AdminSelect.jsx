function AdminSelect({

    label,

    value,

    onChange,

    options=[],

    valueField="id",

    labelField="name"

}){

    return(

        <div style={{marginBottom:"18px"}}>

            <label
            style={{
                display:"block",
                marginBottom:"6px",
                fontWeight:"600"
            }}
            >

                {label}

            </label>

            <select

                value={value}

                onChange={onChange}

                style={{

                    width:"100%",

                    padding:"12px",

                    borderRadius:"10px",

                    border:"1px solid #ddd"

                }}

            >

                <option value="">

                    Välj...

                </option>

                {

                    options.map(option=>

                        <option

                            key={option[valueField]}

                            value={option[valueField]}

                        >

                            {option[labelField]}

                        </option>

                    )

                }

            </select>

        </div>

    )

}

export default AdminSelect;