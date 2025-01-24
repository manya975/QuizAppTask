import { useLocation, useNavigate } from "react-router-dom";

function Student() {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");

    const takeQuiz = () => {
        if (email) {
            navigate(`/quiz-list?email=${email}`);
        } else {
            console.error("Email is not available.");
        }
    };

    const giveFeedback = () => {
        navigate("/feedback");
    };

    const seeScore = () => {
        if (email) {
            navigate(`/see-score?email=${email}`);
        } else {
            console.error("Email is not available.");
        }
    };

    return (
        <>
            <div>
                <h1>!! Welcome Student to Quiz Portal !!</h1>
            </div>
            <div className="options">
                <h2>Functionalities available are : </h2>
                <button name="create" onClick={takeQuiz}>
                    TAKE QUIZ
                </button>
                <button name="seeScore" onClick={seeScore}>
                    SEE SCORE
                </button>
                <button name="feedback" onClick={giveFeedback}>GIVE FEEDBACK</button>
            </div>
        </>
    );
}

export default Student;
