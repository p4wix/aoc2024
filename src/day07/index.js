import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const map = input.split("\n").map((l) => {
    const split = l.split(": ");
    return [Number(split[0]), ...split[1].split(" ").map(Number)];
  });

  return map.reduce((acc, [target, ...numbers]) => {
    return acc + (evaluate(target, ...numbers) ? target : 0);
  }, 0);
};

const evaluate = (target, acc, ...numbers) => {
  if (numbers.length === 0) {
    return acc === target;
  }

  const [nextNumber, ...restNumbers] = numbers;
  return (
     evaluate(target, acc + nextNumber, ...restNumbers) ||
     evaluate(target, acc * nextNumber, ...restNumbers) ||
     evaluate(target, Number(`${acc}${nextNumber}`), ...restNumbers)
  );
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const map = input.split("\n").map((l) => {
    const split = l.split(": ");
    return [Number(split[0]), ...split[1].split(" ").map(Number)];
  });

  return map.reduce((acc, [target, ...numbers]) => {
    return acc + (evaluate(target, ...numbers) ? target : 0);
  }, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
