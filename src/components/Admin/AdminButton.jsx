function AdminButton({

    children,

    onClick,

    type = "button"

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            style={{

                background: "#173B78",

                color: "white",

                border: "none",

                borderRadius: "10px",

                padding: "12px 20px",

                cursor: "pointer",

                fontWeight: "600"

            }}

        >

            {children}

        </button>

    );

}

export default AdminButton;