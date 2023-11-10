export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type HistoryItem = {
  question: string;
  options: string[];
  answer: string;
  selectedAnswer: string;
};

export type AppData = {
  state: "welcome" | "game" | "results";
  points: number;
  currentRound: number;
  maxRounds: number;
  questions: Question[] | null;
  history: HistoryItem[] | null;
};

type AppProps = {
  data: AppData;
  setData: React.Dispatch<React.SetStateAction<AppData>>;
};
