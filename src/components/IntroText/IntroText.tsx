import { useContext } from "react";
import { INTRO_TEXT } from "../../const/text";
import MovesContext from "../../context/moves";

const IntroText = () => {
  const { catBox, moves, completedScores } = useContext(MovesContext);
  const bestScore =
    completedScores.reduce<number | null>(
      (best, score) => (best == null ? score : Math.min(best, score)),
      null
    );

  return (
    <div className="absolute inset-x-0 top-5 z-10 flex flex-col items-center gap-3 px-4 text-center">
      <div
        role="status"
        aria-live="polite"
        className="flex flex-wrap justify-center gap-2"
      >
        <div className="flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/95 px-4 py-2 text-slate-700 shadow-lg backdrop-blur-sm">
          <span className="text-sm font-medium">Current</span>
          <span className="min-w-6 text-lg font-bold tabular-nums text-amber-700">
            {moves.length}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200/80 bg-emerald-50/95 px-4 py-2 text-slate-700 shadow-lg backdrop-blur-sm">
          <span className="text-sm font-medium">All-time best</span>
          <span className="min-w-6 text-lg font-bold tabular-nums text-emerald-700">
            {bestScore ?? "—"}
          </span>
        </div>
      </div>
      {catBox == null && (
        <p className="max-w-4xl text-lg text-slate-300 drop-shadow-md sm:px-8 sm:text-xl">
          {INTRO_TEXT}
        </p>
      )}
    </div>
  );
};

export default IntroText;
