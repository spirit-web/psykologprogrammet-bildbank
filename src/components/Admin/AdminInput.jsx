function AdminInput({

    value,

    onChange,

    placeholder,

    type = "text"

}) {

    return (

        <input

            type={type}

            value={value}

            placeholder={placeholder}

            onChange={onChange}

            style={{

                width: "100%",

                padding: "12px",

                borderRadius: "10px",

                border: "1px solid #ddd",

                marginBottom: "15px",

                fontSize: "15px"

            }}

        />

    );

}

export default AdminInput;