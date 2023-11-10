import { useEffect, useState } from "react";
import { quizData } from "./data.json";
import type { AppData, Question } from "./types";

// Shuffle function using the Fisher-Yates algorithm and ES6+ features
const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring assignment for swapping
  }
  return array;
};

// Function to randomize questions and their options
const randomizeQuestions = (questions: Question[]) => {
  const shuffledQuestions = questions.map((question) => ({
    ...question,
    options: shuffleArray([...question.options]),
  }));
  return shuffleArray(shuffledQuestions);
};

type StateProps = {
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  data: AppData;
};

export const Welcome = ({ setData, data }: StateProps) => {
  const [rounds, setRounds] = useState(data.maxRounds);

  return (
    <div className="m-auto border border-neutral-900 rounded p-12 px-20 flex flex-col gap-4">
      <h1 className="text-4xl font-medium">Quizzz</h1>
      Rounds: {rounds}
      <input
        type="range"
        min={1}
        max={20}
        step={1}
        value={rounds}
        placeholder={data.maxRounds.toString()}
        onChange={(e) => setRounds(Number(e.target.value))}
        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
      />
      <button
        className="block bg-neutral-300 text-neutral-800 font-medium rounded py-2 w-full"
        onClick={() =>
          setData((prev) => {
            return {
              ...prev,
              state: "game",
              currentRound: 0,
              maxRounds: rounds,
              points: 0,
              history: null,
              questions: randomizeQuestions(quizData),
            };
          })
        }
      >
        start game
      </button>
    </div>
  );
};
