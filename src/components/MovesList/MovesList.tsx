import { useContext } from "react";
import MovesContext from "../../context/moves";
import { CONGRATULATIONS, IMPOSSIBLE, MINIMUM_MOVES, MOVES, MOVES_COLORS, TRY_AGAIN } from "../../const/text";
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
}

const MovesList = () => {
  const { moves, catBox } = useContext(MovesContext);
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
        <div className="py-16">
          <p className="text-5xl text-slate-500 select-none text-center">
            {CONGRATULATIONS} {moves.length} {MOVES}
          </p>
          <p className="text-3xl text-slate-500 select-none text-center">{getStrategyConclusion(moves.length)}</p>
        </div>
      )}
      <div className="flex justify-center flex-wrap gap-2 opacity-90 mb-4">
        <span className="leading-[32px]">Your moves: </span>
        {moves.map((move, idx) => (
          <div
            key={idx}
            className={`size-8 flex justify-center items-center ${getColor(
              move,
              idx
            )}`}
          >
            <span>{move + 1}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-wrap gap-2 opacity-90">
        <span className="leading-[32px]">Kitty moves: </span>
        {moves.map((_, idx) => {
          const catMove = catMoves[idx];

          return (
            <div
              key={idx}
              title={catMove == null ? "?" : `Box ${catMove + 1}`}
              className={`size-8 flex justify-center items-center ${
                catMove == null ? "bg-slate-400" : getColor(catMove, idx)
              }`}
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
