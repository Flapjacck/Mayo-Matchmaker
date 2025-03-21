import React, { useState } from "react";

interface Question {
  text: string;
  options: { label: string; value: string }[];
}

const questions: Question[] = [
  {
    text: "How do you feel about spicy food?",
    options: [
      { label: "Love it—give me bold, smoky heat!", value: "A" },
      { label: "Enjoy spice, but I prefer it balanced.", value: "B" },
      {
        label: "A mild kick paired with fresh citrusy zest is perfect.",
        value: "C",
      },
      { label: "No spice for me", value: "D" },
    ],
  },
  {
    text: "What’s your go-to sandwich topping?",
    options: [
      { label: "Smoky peppers, jalapeños, or spicy sauces.", value: "A" },
      { label: "A creamy sauce with a gentle, balanced spice.", value: "B" },
      {
        label: "Fresh toppings like lime zest, chili flakes, or cilantro.",
        value: "C",
      },
      {
        label:
          "Garlic spreads, herb-infused dressings, or olive oil-based sauces.",
        value: "D",
      },
    ],
  },
  {
    text: "Which cuisine excites your taste buds most?",
    options: [
      { label: "Mexican or Cajun—smoky, spicy, bold.", value: "A" },
      {
        label: "Asian fusion or sushi—balanced spice with creamy textures.",
        value: "B",
      },
      {
        label: "Thai or Latin—fresh citrus, mild chili, bright flavors.",
        value: "C",
      },
      {
        label:
          "Italian or Mediterranean—rich garlic, fresh herbs, creamy textures.",
        value: "D",
      },
    ],
  },
  {
    text: "If you could take a flavor vacation, where would you go?",
    options: [
      {
        label: "Mexico—spicy tacos, smoky peppers, and bold flavors.",
        value: "A",
      },
      { label: "Japan—spicy tuna rolls, creamy spicy ramen.", value: "B" },
      {
        label: "Thailand—fresh seafood, chili lime salads, vibrant flavors.",
        value: "C",
      },
      {
        label:
          "Italy or Greece—garlicky pasta dishes, herby flatbreads, rich sauces.",
        value: "D",
      },
    ],
  },
];

const getResult = (answers: string[]) => {
  const count: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  answers.forEach((answer) => count[answer]++);

  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  const topTwo = sorted.slice(0, 2).map(([key]) => key);
  const [top] = topTwo;

  const resultMap: Record<string, string> = {
    A: "Chipotle Mayo (Bold, smoky, and spicy—perfect for tacos, burgers, and grilled meats.)",
    B: "Spicy Mayo (Balanced spice with creamy smoothness—excellent for sandwiches, sushi, and versatile dishes.)",
    C: "Chilli Lime Mayo (Zesty lime, mild chili—ideal for seafood, tacos, salads, wraps, or grilled veggies.)",
    D: "Garlic Aioli Mayo or Italian Herb and Garlic Mayo (Rich garlic, herbs, and creamy textures—excellent for sandwiches, chicken, roasted veggies, pastas, or dipping sauces.)",
  };

  const blends: Record<string, string> = {
    AB: "Chipotle Mayo or Spicy Mayo (You prefer bold spice but sometimes like a more balanced, creamy kick.)",
    AC: "Chipotle Mayo or Chilli Lime Mayo (Bold heat excites you, yet fresh zest sometimes catches your taste.)",
    AD: "Chipotle Mayo or Garlic Aioli / Italian Herb and Garlic Mayo (You alternate between bold spicy flavors and creamy, garlicky, herby comforts.)",
    BC: "Spicy Mayo or Chilli Lime Mayo (You appreciate balanced spice, creamy texture, and fresh, citrusy flavors.)",
    BD: "Spicy Mayo or Garlic Aioli / Italian Herb and Garlic Mayo (You love gentle spice paired with creamy garlic and herb flavors.)",
    CD: "Chilli Lime Mayo or Garlic Aioli / Italian Herb and Garlic Mayo (Fresh, zesty flavors and garlicky, herb-rich profiles equally appeal to you.)",
    ABCD: "Chipotle Mayo, Spicy Mayo, Chilli Lime Mayo, Garlic Aioli Mayo, or Italian Herb and Garlic Mayo (Your palate enjoys variety—bold, spicy, zesty, creamy garlic-herb flavors all appeal to you.)",
  };

  const allLetters = Object.keys(count).filter((key) => count[key] > 0);
  if (allLetters.length === 4) {
    return blends["ABCD"];
  }

  if (sorted[0][1] === sorted[1][1]) {
    const key = topTwo.sort().join("");
    return blends[key] || resultMap[top];
  }

  return resultMap[top];
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
