import React, { useState } from "react";

function Feedback() {
    const [submitting, setSubmitting] = useState(false); 
    const [successMessage, setSuccessMessage] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(""); 
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitting(true); 
        setSuccessMessage(""); 
        setErrorMessage(""); 
        setTimeout(() => {
            if (feedback.trim()) {
                setSuccessMessage("Thank you for your feedback!");
                setFeedback("");
            } else {
                setErrorMessage("Please enter feedback before submitting.");
            }
            setSubmitting(false);
        }, 1000);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Feedback</h1>
            <p>We value your feedback. Please let us know your Views and problems:</p>
            <form onSubmit={handleSubmit} style={{ display: "inline-block", width: "50%" }}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="5"
                    style={{ width: "150%", padding: "10px", fontSize: "16px", marginBottom: "10px", background: "Black", color:"White" }}
                    placeholder="Enter your feedback here..."
                    required
                />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        backgroundColor: "#0f0",
                        color: "Black",
                        border: "none",
                    }}
                    disabled={submitting} 
                >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                </button>
            </form>
            {successMessage && (
                <div style={{ color: "green", marginTop: "20px" }}>{successMessage}</div>
            )}
            {errorMessage && (
                <div style={{ color: "red", marginTop: "20px" }}>{errorMessage}</div>
            )}
        </div>
    );
}

export default Feedback;
