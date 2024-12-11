import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(" ").map(x => +x);

  let stones = input;
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < stones.length; j++) {
      if (stones[j] === 0) stones[j] = 1;
      else if (stones[j].toString().length % 2 === 0) {
        let stone = stones[j].toString(), mid = stone.length / 2;
        stones[j] = +stone.substr(0, mid);
        stones.splice(++j, 0, +stone.substr(mid));
      } else stones[j] *= 2024;
    }
  }

  return stones.length;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(" ").map(x => +x);

  let stones = {}, evens = [], odds = [];
  input.forEach(x => {
    stones[x] = 1;
    if (x == 0) return;
    if (x.toString().length % 2 == 0) evens.push(x);
    else odds.push(x);
  });

  for (let i = 0; i < 75; i++) {
    let newStones = {}, newEvens = new Set(), newOdds = new Set();

    if (stones[0]) newStones[1] = stones[0];
    if (stones[0] > 0) newOdds.add(1);

    for (let j = 0; j < evens.length; j++) {
      let mid = evens[j].toString().length / 2, first = +evens[j].toString().slice(0, mid), second = +evens[j].toString().slice(mid);
      newStones[first] = (newStones[first] || 0) + stones[evens[j]];
      newStones[second] = (newStones[second] || 0) + stones[evens[j]];

      if (first.toString().length % 2 == 0) newEvens.add(first);
      else if (first != 0) newOdds.add(first);

      if (second.toString().length % 2 == 0) newEvens.add(second);
      else if (second != 0) newOdds.add(second);
    }
    for (let j = 0; j < odds.length; j++) {
      newStones[odds[j] * 2024] = (newStones[odds[j] * 2024] || 0) + stones[odds[j]];
      if ((odds[j] * 2024).toString().length % 2 == 0) newEvens.add(odds[j] * 2024);
      else newOdds.add(odds[j] * 2024);
    }

    evens = [...newEvens];
    odds = [...newOdds];
    stones = newStones;
  }

  let stoneCount = 0;
  for (let stone in stones) stoneCount += stones[stone];;

  return stoneCount;
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
