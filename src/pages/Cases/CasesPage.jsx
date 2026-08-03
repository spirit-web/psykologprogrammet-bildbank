import BackButton from "../../components/BackButton/BackButton";
import HippocampusCases from "../Hippocampus/HippocampusCases";

function CasesPage() {

    return (

        <div style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>

            <BackButton />

            <h1>🩺 Fall</h1>

            <p>Fiktiva patientfall att koppla psykologverktyg till.</p>

            <HippocampusCases />

        </div>

    );

}

export default CasesPage;
