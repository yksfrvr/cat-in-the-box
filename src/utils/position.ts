import { BOX_COUNT } from "../const/config";

export const getPositionOnMove = (
  move: number,
  prevPosition: Set<number>
): Set<number> => {
  const newPositions = new Set<number>();

  prevPosition.forEach((pos: number) => {
    const p1 = pos + 1;
    const p2 = pos - 1;

    if (p1 < BOX_COUNT && p1 !== move) {
      newPositions.add(p1);
    }

    if (p2 >= 0 && p2 !== move) {
      newPositions.add(p2);
    }
  });

  return newPositions;
};

export const getCatPath = (moves: number[], catBox: number): number[] => {
  if (moves.length === 0) return [];
  if (moves.length === 1) return [catBox];

  let positions = new Set([...Array(BOX_COUNT).keys()]);
  const previousPositions: Map<number, number>[] = [];

  moves.slice(0, -1).forEach((move) => {
    const nextPositions = new Set<number>();
    const previousPositionByNext = new Map<number, number>();

    positions.forEach((position) => {
      [position - 1, position + 1].forEach((nextPosition) => {
        if (
          nextPosition >= 0 &&
          nextPosition < BOX_COUNT &&
          nextPosition !== move &&
          !nextPositions.has(nextPosition)
        ) {
          nextPositions.add(nextPosition);
          previousPositionByNext.set(nextPosition, position);
        }
      });
    });

    positions = nextPositions;
    previousPositions.push(previousPositionByNext);
  });

  let position = [...positions].find(
    (possiblePosition) => Math.abs(possiblePosition - catBox) === 1
  );

  if (position === undefined) return [];

  const path = [catBox];
  for (let index = previousPositions.length - 1; index >= 1; index--) {
    path.unshift(position);
    const previousPosition = previousPositions[index].get(position);
    if (previousPosition === undefined) return [];
    position = previousPosition;
  }

  path.unshift(position);
  return path;
};
