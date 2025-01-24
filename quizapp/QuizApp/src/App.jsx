import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Add from "./pages/Add";
import AddQuestion from "./pages/AddQuestion";
import Admin from "./pages/Admin";
import AttemptQuiz from "./pages/AttemptQuiz";
import CreateQuiz from "./pages/CreateQuiz";
import Feedback from "./pages/Feedback";
import QuizList from "./pages/QuizList";
import QuizTopicWise from "./pages/QuizTopicWise";
import Result from "./pages/Result";
import SaveScore from "./pages/SaveScore";
import SeeScore from "./pages/SeeScore";
import Student from "./pages/Student";
import Update from "./pages/Update";
import ViewQuestions from "./pages/ViewQuestions";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define a route for the root path */}
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/quizTypeWise" element={<QuizTopicWise />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/add-question" element={<Add />} />
        <Route path="/update-question/:id" element={<Update />} />
        <Route path="/" element={<Student />} />
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/attempt-quiz/:quizId" element={<AttemptQuiz />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/see-score" element={<SeeScore />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/view-questions" element={<ViewQuestions />} />
        <Route path="/save-score" element={<SaveScore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
