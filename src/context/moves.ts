import { createContext } from "react";

type MovesContextType = {
  moves: number[];
  addMove: (move: number) => void;
  catBox: number | null;
  completedScores: number[];
  restartGame: () => void;
  gameId: number;
};

const MovesContext = createContext<MovesContextType>({
  moves: [],
  addMove: () => {},
  catBox: null,
  completedScores: [],
  restartGame: () => {},
  gameId: 0,
});

export default MovesContext;
