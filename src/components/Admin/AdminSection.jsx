function AdminSection({

    title,

    children

}) {

    return (

        <div

            style={{

                background: "#fff",

                borderRadius: "18px",

                padding: "35px",

                marginTop: "35px",

                boxShadow: "0 8px 25px rgba(0,0,0,0.08)"

            }}

        >

            <h2

                style={{

                    marginBottom: "30px"

                }}

            >

                {title}

            </h2>

            {children}

        </div>

    );

}

export default AdminSection;