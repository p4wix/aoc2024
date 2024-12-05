import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split('\n\n');
  const rules = input[0].split('\n').map(x => x.split('|').map(Number));
  const updates = input[1].split('\n').map(x => x.split(',').map(Number));
  let ans = 0;

  updates.forEach(update => {
    let isOrdered = true;

    for (let rule of rules) {
      const i = update.indexOf(rule[0]);
      const ii = update.indexOf(rule[1]);
      if (i === -1 || ii === -1) continue;
      if (i > ii) isOrdered = false;

    }
    if (isOrdered) ans += update[0.5 * (update.length - 1)];
  })

  return ans;

};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split('\n\n');
  const rules = input[0].split('\n').map(x => x.split('|').map(Number));
  const updates = input[1].split('\n').map(x => x.split(',').map(Number));
  let ans = 0;

  updates.forEach(update => {
    let isOrdered = true;

    const rulesThatApply = {};

    for (let rule of rules) {
      const i = update.indexOf(rule[0]);
      const ii = update.indexOf(rule[1]);
      if (i === -1 || ii === -1) continue;
      rulesThatApply[rule[0]] ||= 0;
      rulesThatApply[rule[0]]++;
      if (i > ii) isOrdered = false;
    }
    if (!isOrdered) {
      let sortedKeys = Object.keys(rulesThatApply).sort(function (a, b) { return rulesThatApply[b] - rulesThatApply[a] });
      ans += +sortedKeys[0.5 * (sortedKeys.length)];
    }
  });

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
