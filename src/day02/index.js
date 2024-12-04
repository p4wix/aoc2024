import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const isSafe = (report) => {
  const startDirection = Math.sign(report[1] - report[0]);

  for (let i = 1; i < report.length; i++) {
    const delta = report[i] - report[i - 1];

    if (Math.abs(delta) < 1 || Math.abs(delta) > 3) {
      return false;
    }

    if (startDirection * delta <= 0) {
      return false;
    }
  }

  return true;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let ans = 0;
  const reports = input.split('\n').map((line) => line.split(/\s+/).map(Number));

  for (const report of reports) {
    ans += isSafe(report);
  }

  return ans;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const reports = input.split('\n').map((line) => line.split(/\s+/).map(Number));
  let ans = 0;

  for (const report of reports) {
    if (isSafe(report)) {
      ans++;
      continue;
    }

    for (let i = 0; i < report.length; i++) {
      if (isSafe(report.toSpliced(i, 1))) {
        ans++;
        break;
      }
    }
  }

  return ans;
};

run({
  part1: {
    tests: [
      // {
      //   input: `
      //     7 6 4 2 1
      //     1 2 7 8 9
      //     9 7 6 2 1
      //     1 3 2 4 5
      //     8 6 4 4 1
      //     1 3 6 7 9
      //     `,
      //   expected: "2",
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