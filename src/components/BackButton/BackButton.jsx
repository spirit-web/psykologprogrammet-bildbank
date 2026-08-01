import "./BackButton.css";
import { useNavigate } from "react-router-dom";

function BackButton() {

    const navigate = useNavigate();

    return (

        <button
            className="back-button"
            onClick={() => navigate(-1)}
        >

            ← Tillbaka

        </button>

    );

}

export default BackButton;