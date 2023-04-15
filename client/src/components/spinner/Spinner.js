import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#136CBE",
};

function Spinner() {
    return (
        <div className="sweet-loading d-block" style={{ top: "40%", right: "45%", position: "fixed", marginTop: "-..px", marginRight: "-..px" }}>
            <ClipLoader
                color="#ffffff"
                loading={true}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinner;