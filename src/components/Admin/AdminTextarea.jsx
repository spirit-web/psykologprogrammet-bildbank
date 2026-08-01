function AdminTextarea({

    value,

    onChange,

    placeholder

}) {

    return (

        <textarea

            rows={6}

            value={value}

            placeholder={placeholder}

            onChange={onChange}

            style={{

                width: "100%",

                padding: "12px",

                borderRadius: "10px",

                border: "1px solid #ddd",

                marginBottom: "15px",

                fontSize: "15px",

                resize: "vertical"

            }}

        />

    );

}

export default AdminTextarea;