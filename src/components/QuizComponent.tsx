import React, { useState } from "react";

interface Question {
  text: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    text: "How do you feel about spicy food?",
    options: [
      { label: "Love it—bring on the heat!", value: "A" },
      {
        label: "A little spice is great, but nothing too intense.",
        value: "B",
      },
      {
        label: "I prefer mild, creamy flavors with more depth than heat.",
        value: "C",
      },
      {
        label: "No spice for me—I like smooth, cheesy, or herby flavors.",
        value: "D",
      },
    ],
  },
  {
    text: "What’s your ideal sandwich topping?",
    options: [
      { label: "Jalapeños or a smoky, spicy sauce.", value: "A" },
      { label: "A rich, garlicky spread.", value: "B" },
      { label: "A parmesan cheese crust or melted cheese.", value: "C" },
      { label: "A creamy ranch-style dressing.", value: "D" },
    ],
  },
  {
    text: "What type of cuisine do you love most?",
    options: [
      { label: "Mexican or Cajun—bold and spicy.", value: "A" },
      {
        label: "Mediterranean or Italian—garlic and rich flavors.",
        value: "B",
      },
      { label: "Classic American—cheesy, creamy, and indulgent.", value: "C" },
      {
        label: "Southern comfort—BBQ, ranch flavors, and hearty meals.",
        value: "D",
      },
    ],
  },
  {
    text: "If you could travel for food, where would you go?",
    options: [
      { label: "Mexico—tacos, hot sauce, and smoky flavors.", value: "A" },
      { label: "Italy—garlic, olive oil, and creamy sauces.", value: "B" },
      {
        label: "A classic pizzeria—parmesan, garlic, and creamy pastas.",
        value: "C",
      },
      {
        label:
          "A countryside diner—crispy chicken, ranch flavors, and hearty meals.",
        value: "D",
      },
    ],
  },
];

const getResult = (answers: string[]) => {
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((answer) => count[answer]++);

  const sortedEntries = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const topChoice = sortedEntries[0][0];

  const strongPreferenceMap: Record<string, string> = {
    A: "Chipotle Mayo (Bold, smoky, and perfect for tacos, burgers, and grilled meats.)",
    B: "Garlic Aioli Mayo (Rich, smooth, and packed with garlic flavor—ideal for sandwiches and roasted veggies.)",
    C: "Garlic Parmesan Mayo (Creamy, cheesy, and indulgent—great for pastas, burgers, and crispy chicken.)",
    D: "Buttermilk Ranch Mayo (Classic, herby, and creamy—perfect for dipping, BBQ, and comfort foods.)",
  };

  if (sortedEntries[0][1] > sortedEntries[1][1]) {
    return strongPreferenceMap[topChoice];
  }

  const selected = sortedEntries
    .filter(([, value]) => value > 0)
    .map(([key]) => key);
  const resultMap: Record<string, string[]> = {
    "A,B": ["Chipotle Mayo", "Spicy Mayo"],
    "A,C": ["Chipotle Mayo", "Garlic Parmesan Mayo"],
    "A,D": ["Chipotle Mayo", "Buttermilk Ranch Mayo"],
    "B,C": ["Spicy Mayo", "Garlic Aioli Mayo"],
    "B,D": ["Spicy Mayo", "Buttermilk Ranch Mayo"],
    "C,D": ["Garlic Aioli Mayo", "Garlic Parmesan Mayo"],
    "A,B,C,D": [
      "Chipotle Mayo",
      "Spicy Mayo",
      "Garlic Aioli Mayo",
      "Garlic Parmesan Mayo",
      "Buttermilk Ranch Mayo",
    ],
  };

  const key = selected.sort().join(",");
  return (
    resultMap[key]?.join(" or ") || "A unique mayo blend based on your taste!"
  );
};

const QuizComponent: React.FC = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (value: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 500);
    } else {
      setTimeout(() => setShowResult(true), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white px-6">
      {!showResult ? (
        <>
          <h1 className="text-3xl font-bold mb-4 text-yellow-400">
            Mayo Matchmaker Quiz
          </h1>
          <div className="w-full max-w-md text-center">
            <p className="text-lg font-semibold mb-4">
              {questions[currentQuestion].text}
            </p>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  className="block w-full p-3 rounded-lg bg-gray-700 hover:bg-yellow-400 hover:text-blue-900 font-semibold transition-all"
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm opacity-80">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Your Perfect Mayo Match
          </h2>
          <p className="text-xl">{getResult(answers)}</p>
          <button
            className="mt-6 px-6 py-3 bg-yellow-400 text-blue-900 font-semibold text-lg rounded-lg shadow-lg hover:scale-105 transition-all"
            onClick={() => {
              setAnswers([]);
              setCurrentQuestion(0);
              setShowResult(false);
            }}
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
