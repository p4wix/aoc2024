import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/g).map(x => x.split("").map(x => +x));
  let zeros = [];
  for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[i].length; j++)
      if (input[i][j] === 0) zeros.push([i, j]);

  function findNext(pos) {
    let current = input[pos[0]][pos[1]],
       next = [];

    if (input[pos[0] + 1]?.[pos[1]] === current + 1) next.push([pos[0] + 1, pos[1]]);
    if (input[pos[0] - 1]?.[pos[1]] === current + 1) next.push([pos[0] - 1, pos[1]]);
    if (input[pos[0]][pos[1] + 1] === current + 1) next.push([pos[0], pos[1] + 1]);
    if (input[pos[0]][pos[1] - 1] === current + 1) next.push([pos[0], pos[1] - 1]);

    return next;
  }

  let trailheads = 0;
  zeros.forEach(pos => {
    let next = [ pos ];
    while (next.length) {
      let found = [];
      next.forEach(pos => {
        if (input[pos[0]][pos[1]] === 9) trailheads++;
        else found.push(...findNext(pos));
      });
      found.forEach((pos, i) => {
        for (let j = i + 1; j < found.length; j++)
          if (found[j][0] === pos[0] && found[j][1] === pos[1]) found[j] = [];
      });
      next = found.filter(x => x.length);
    }
  });

  return trailheads;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/g).map(x => x.split("").map(x => +x));
  let zeros = [];
  for (let i = 0; i < input.length; i++)
    for (let j = 0; j < input[i].length; j++)
      if (input[i][j] == 0) zeros.push([i, j]);

  function findNext(pos) {
    let current = input[pos[0]][pos[1]],
       next = [];

    if (input[pos[0] + 1]?.[pos[1]] == current + 1) next.push([pos[0] + 1, pos[1]]);
    if (input[pos[0] - 1]?.[pos[1]] == current + 1) next.push([pos[0] - 1, pos[1]]);
    if (input[pos[0]][pos[1] + 1] == current + 1) next.push([pos[0], pos[1] + 1]);
    if (input[pos[0]][pos[1] - 1] == current + 1) next.push([pos[0], pos[1] - 1]);

    return next;
  }

  let trailheads = 0;
  zeros.forEach(pos => {
    let next = [ pos ];
    while (next.length) {
      let found = [];
      next.forEach(pos => {
        if (input[pos[0]][pos[1]] == 9) trailheads++;
        else found.push(...findNext(pos));
      });
      next = found.filter(x => x.length);
    }
  });
  return trailheads;
};

run({
  part1: {
    tests: [
    ],
    solution: part1,
  },
  part2: {
    tests: [
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
