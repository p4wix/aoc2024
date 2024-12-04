import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).toString();
  const regexp = /mul\((\d+),(\d+)\)/g;
  let ans = 0;
  let match;

  while (match = regexp.exec(input)) {
    ans += match[1] * match[2];
  }

  return ans;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).toString();
  const regexp = /do(?:n't)*\(\)|mul\((\d+),(\d+)\)/g;

  let ans = 0;
  let mulEnabled = true;
  let match;

  while (match = regexp.exec(input)) {
    const [F, arg1, arg2] = match;

    switch (F) {
      case 'do()':
        mulEnabled = true;
        break;
      case 'don\'t()':
        mulEnabled = false;
        break;
      default:
        ans += mulEnabled ? arg1 * arg2 : 0;
    }
  }

  return ans;
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
