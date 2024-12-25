import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split('\n\n');
  const keys = [];
  const locks = [];

  input.forEach((d) => {
    const m = d.split('\n');
    const cols = [0, 1, 2, 3, 4].map(
       (c) =>
          m
             .map((r) => r[c])
             .join('')
             .match(/#+/)[0].length - 1
    );
    if (m[0] === '#####') locks.push(cols);
    if (m.at(-1) === '#####') keys.push(cols);
  });

  let fit = 0;
  keys.forEach((ks) => {
    locks.forEach((ls) => {
      if (ls.every((l, i) => l + ks[i] <= 5)) fit += 1;
    });
  });
  return fit;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
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
