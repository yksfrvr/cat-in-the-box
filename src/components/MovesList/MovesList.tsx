import { useContext } from "react";
import MovesContext from "../../context/moves";
import {
  CONGRATULATIONS,
  IMPOSSIBLE,
  MINIMUM_MOVES,
  MOVES,
  MOVES_COLORS,
  TRY_AGAIN,
  UNKNOWN_CAT_COLOR,
} from "../../const/text";
import { BOXES_CONFIG } from "../../const/config";
import { getCatPath } from "../../utils/position";

const getStrategyConclusion = (movesNumber: number): string => {
  if (movesNumber < 10) {
    return IMPOSSIBLE;
  } else if (movesNumber == 10) {
    return MINIMUM_MOVES;
  } else {
    return TRY_AGAIN;
  }
};

const MovesList = () => {
  const { moves, catBox, restartGame } = useContext(MovesContext);
  const catMoves = catBox == null ? [] : getCatPath(moves, catBox);

  const getColor = (move: number, idx: number) => {
    if (MOVES_COLORS.length == BOXES_CONFIG.length) {
      return MOVES_COLORS[move];
    } else {
      return MOVES_COLORS[idx % MOVES_COLORS.length];
    }
  };

  return (
    <div className="absolute bottom-16 left-0 right-0">
      {catBox != null && (
        <div className="mx-auto mb-6 flex w-fit max-w-[calc(100%-2rem)] flex-col items-center gap-3 text-center">
          <div role="status" className="rounded-2xl border border-emerald-200/80 bg-emerald-50/95 px-6 py-4 text-slate-800 shadow-lg backdrop-blur-sm">
            <p className="text-xl font-semibold text-emerald-700 sm:text-2xl">
              {CONGRATULATIONS} {moves.length} {MOVES}
            </p>
            <p className="mt-1 text-sm text-slate-700 sm:text-base">
              {getStrategyConclusion(moves.length)}
            </p>
          </div>
          <button
            type="button"
            onClick={restartGame}
            className="flex items-center gap-2 rounded-full border border-amber-300/50 bg-amber-400 px-6 py-3 text-base font-bold text-slate-900 shadow-lg transition hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
          >
            <span aria-hidden="true">↻</span>
            Play again
          </button>
        </div>
      )}
      <div className="flex justify-center flex-wrap gap-2 opacity-90 mb-4">
        <span className="leading-[32px]">Your moves: </span>
        {moves.map((move, idx) => (
          <div
            key={idx}
            className="size-8 flex justify-center items-center rounded-md"
            style={{ backgroundColor: getColor(move, idx) }}
          >
            <span>{move + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-wrap gap-2 opacity-90">
        <span className="leading-[32px]">Cat moves: </span>
        {moves.map((_, idx) => {
          const catMove = catMoves[idx];

          return (
            <div
              key={idx}
              title={catMove == null ? "?" : `Box ${catMove + 1}`}
              className="size-8 flex justify-center items-center rounded-md"
              style={{ backgroundColor: catMove == null ? UNKNOWN_CAT_COLOR : getColor(catMove, idx) }}
            >
              <span>{catMove == null ? "?" : catMove + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovesList;
