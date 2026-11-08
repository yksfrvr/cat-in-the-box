import { useState } from "react";

import { BOX_COUNT } from "../const/config";
import { getPositionOnMove } from "../utils/position";

import MovesContext from "./moves";

const SCORE_HISTORY_KEY = "cat-in-the-box-score-history";

const loadScoreHistory = (): number[] => {
  try {
    const savedScores = window.localStorage.getItem(SCORE_HISTORY_KEY);
    if (savedScores == null) return [];

    const parsedScores: unknown = JSON.parse(savedScores);
    if (
      !Array.isArray(parsedScores) ||
      !parsedScores.every(
        (score: unknown): score is number =>
          typeof score === "number" &&
          Number.isInteger(score) &&
          score > 0
      )
    ) {
      throw new Error("Saved score history has an invalid format.");
    }

    return parsedScores;
  } catch (error) {
    console.error("Unable to load the saved score history.", error);
    return [];
  }
};

type Props = {
  children: React.ReactNode;
};

const MovesContextProvider = ({ children }: Props) => {
  const [moves, setMoves] = useState<number[]>([]);
  const [completedScores, setCompletedScores] = useState(loadScoreHistory);
  const [gameId, setGameId] = useState(0);
  const [position, setPosition] = useState<Set<number>>(
    new Set([...Array(BOX_COUNT).keys()])
  );
  const [catBox, setCatBox] = useState<number | null>(null);

  const addMove = (move: number) => {
    const positions = getPositionOnMove(move, position);
    setMoves((currentMoves) => [...currentMoves, move]);

    setPosition(positions);

    if (positions.size == 0) {
      setCatBox(move);
      const score = moves.length + 1;
      const nextScores = [...completedScores, score];
      setCompletedScores(nextScores);

      try {
        window.localStorage.setItem(
          SCORE_HISTORY_KEY,
          JSON.stringify(nextScores)
        );
      } catch (error) {
        console.error("Unable to save the completed game score.", error);
      }
    }
  };

  const restartGame = () => {
    setMoves([]);
    setPosition(new Set([...Array(BOX_COUNT).keys()]));
    setCatBox(null);
    setGameId((id) => id + 1);
  };

  const state = {
    moves,
    addMove,
    catBox,
    completedScores,
    restartGame,
    gameId,
  };

  return (
    <MovesContext.Provider value={state}>{children}</MovesContext.Provider>
  );
};

export default MovesContextProvider;
