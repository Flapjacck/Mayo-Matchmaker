import React from "react";

interface LandingPageProps {
  startQuiz: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ startQuiz }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center text-white px-4">
      {/* Quiz Title */}
      <h1 className="text-5xl md:text-6xl font-bold drop-shadow-md animated-title">
        Mayo Matchmaker Quiz
      </h1>
      <p className="text-lg md:text-xl mt-4 opacity-90">
        Find Your Perfect Flavor!
      </p>

      {/* Start Quiz Button */}
      <button
        className="mt-6 px-6 py-3 bg-yellow-400 text-blue-900 font-semibold text-lg rounded-lg shadow-lg hover:scale-105 transition-all"
        onClick={startQuiz}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default LandingPage;
