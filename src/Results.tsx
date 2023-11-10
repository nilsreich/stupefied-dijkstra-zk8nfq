import React from "react";
import type { AppData } from "./types";

type StateProps = {
  setData: React.Dispatch<React.SetStateAction<AppData>>;
  data: AppData;
};

export const Results = ({ setData, data }: StateProps) => {
  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center border-b p-4 border-neutral-700">
        <div className="text-3xl ">Review</div>

        <div className="text-lg"> Results:{data.points}</div>
        <button
          className="bg-neutral-300 text-neutral-800 rounded p-4 font-medium "
          onClick={() =>
            setData((prev) => {
              return { ...prev, state: "welcome" };
            })
          }
        >
          new game
        </button>
      </div>
      <div>
        {data.history?.map((item, index) => {
          return (
            <div key={index} className="my-4">
              <div className="text-xl font-medium">
                {index + 1}. {item.question}
              </div>
              <div className="flex gap-2">
                {item.options.map((option) => {
                  return (
                    <div
                      key={option}
                      className={`${
                        item.selectedAnswer === item.answer &&
                        item.answer === option
                          ? "text-green-600"
                          : item.selectedAnswer === option
                          ? "text-red-600"
                          : item.answer === option
                          ? "text-green-600"
                          : "text-neutral-500"
                      }`}
                    >
                      {option}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
