import { useState } from "react";
import type { AppData } from "./types";
import { XIcon } from "lucide-react";

type Props = {
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  data: AppData;
};

export const Game = ({ setData, data }: Props) => {
  const { question, options, answer } = data.questions![data.currentRound];

  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [resultColor, setResultColor] = useState<string | null>(null);

  const handleCheck = () => {
    if (userAnswer !== null) {
      const isCorrect = options[userAnswer] === answer;
      isCorrect
        ? setData({ ...data, points: data.points + 100 })
        : setData({ ...data, points: data.points - 100 });
      setResultColor(isCorrect ? "ring ring-green-600" : "ring ring-red-600");
      setData((prev) => ({
        ...prev,
        history: [
          ...(prev.history ?? []),
          {
            question: question,
            options: options,
            answer: answer,
            selectedAnswer: options[userAnswer],
          },
        ],
      }));
    }
  };

  const handleNext = () => {
    if (data.currentRound + 1 === data.maxRounds) {
      setData({ ...data, state: "results" });
    }
    setUserAnswer(null);
    setResultColor(null);
    setData((prev) => ({ ...prev, currentRound: prev.currentRound + 1 }));
  };

  return (
    <div className="flex flex-col mx-auto gap-4 p-4 w-[800px]">
      <div className="border-b w-full border-neutral-900 flex justify-between items-center pb-4">
        <div>{data.points}</div>
        <div>
          {data.currentRound} / {data.maxRounds}
        </div>
        <button
          onClick={() => setData((prev) => ({ ...prev, state: "welcome" }))}
        >
          <XIcon />
        </button>
      </div>

      <div className="border p-4 rounded flex justify-center items-center text-4xl grow border-neutral-900">
        {question}
      </div>

      <div className="grid grid-cols-2 gap-4 grow">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setUserAnswer(index)}
            disabled={resultColor != null}
            className={`${
              userAnswer === index
                ? resultColor || "ring"
                : answer === option && resultColor
                ? "ring ring-green-600"
                : "ring-0"
            } border rounded p-2 border-neutral-900 min-h-[100%] overflow-clip text-lg disabled:text-neutral-500`}
          >
            {option}
          </button>
        ))}
      </div>

      {resultColor ? (
        <button
          onClick={handleNext}
          className="bg-neutral-300 text-neutral-900 rounded py-4 font-medium"
        >
          {data.currentRound + 1 === data.maxRounds ? "show results" : "next"}
        </button>
      ) : (
        <button
          onClick={handleCheck}
          disabled={userAnswer === null}
          className="bg-neutral-300 text-neutral-900 rounded py-4 font-medium disabled:bg-neutral-500"
        >
          Check
        </button>
      )}
    </div>
  );
};
