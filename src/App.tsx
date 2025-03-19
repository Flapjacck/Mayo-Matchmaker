import { useState } from "react";
import LandingPage from "./components/LandingPage";
import QuizComponent from "./components/QuizComponent";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return showQuiz ? (
    <QuizComponent />
  ) : (
    <LandingPage startQuiz={() => setShowQuiz(true)} />
  );
}

export default App;
