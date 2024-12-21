import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n\r?\n/g).map(group => group.split(/\r?\n/g));
  let machines = input.map(machine => ({
    A: { x: +machine[0].split(" ")[2].split("+")[1].split(",")[0], y: +machine[0].split(" ")[3].split("+")[1] },
    B: { x: +machine[1].split(" ")[2].split("+")[1].split(",")[0], y: +machine[1].split(" ")[3].split("+")[1] },
    prize: { x: +machine[2].split(" ")[1].split("=")[1].split(",")[0], y: +machine[2].split(" ")[2].split("=")[1] }
  }));

  let tokens = 0;
  machines.forEach(machine => {
    let combosX = [], combosY = [];

    // all this code was written first try, and it actually worked!!
    // and yes, i could've used the same method as in part 2, but then this code that i did all by myself would be lost
    for (let i = 0; i < 100; i++) {
      let A = i, B = 0;
      while (A * machine.A.x + B * machine.B.x < machine.prize.x) B++;
      if (A * machine.A.x + B * machine.B.x == machine.prize.x) combosX.push({ A, B });
    }
    for (let i = 0; i < 100; i++) {
      let A = i, B = 0;
      while (A * machine.A.y + B * machine.B.y < machine.prize.y) B++;
      if (A * machine.A.y + B * machine.B.y == machine.prize.y) combosY.push({ A, B });
    }

    for (let i = 0; i < combosX.length; i++)
      for (let j = 0; j < combosY.length; j++)
        if (combosX[i].A == combosY[j].A && combosX[i].B == combosY[j].B) return tokens += 3 * combosX[i].A + combosX[i].B;
  });

  return tokens;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n\r?\n/g).map(group => group.split(/\r?\n/g));
  let machines = input.map(machine => ({
    A: { x: +machine[0].split(" ")[2].split("+")[1].split(",")[0], y: +machine[0].split(" ")[3].split("+")[1] },
    B: { x: +machine[1].split(" ")[2].split("+")[1].split(",")[0], y: +machine[1].split(" ")[3].split("+")[1] },
    prize: { x: +machine[2].split(" ")[1].split("=")[1].split(",")[0] + 10000000000000, y: +machine[2].split(" ")[2].split("=")[1] + 10000000000000 }
  }));

  let tokens = 0;
  machines.forEach(machine => {
    // i figured this out using desmos lol https://www.desmos.com/calculator/nlz5nq8wq5
    let equations = [ { x: machine.A.x, y: machine.B.x, z: machine.prize.x}, { x: machine.A.y, y: machine.B.y, z: machine.prize.y } ],
       m = -equations[0].x / equations[1].x,
       b = (equations[0].z + m * equations[1].z) / (equations[0].y + m * equations[1].y),
       a = (equations[0].z - b * equations[0].y) / equations[0].x;

    if (a > 0 && b > 0 && Math.abs(a - Math.round(a)) < 0.01 && Math.abs(b - Math.round(b)) < 0.01) tokens += Math.round(a) * 3 + Math.round(b);
  });
  return tokens;
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
