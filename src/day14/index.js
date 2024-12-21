import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const width = 101, height = 103;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/g);
  let robots = input.map(robot => ({
    pos: { x: +robot.split("=")[1].split(",")[0], y: +robot.split("=")[1].split(",")[1].split(" ")[0] },
    vel: { x: +robot.split("=")[2].split(",")[0], y: +robot.split("=")[2].split(",")[1].split(" ")[0] }
  }));

  for (let i = 0; i < 100; i++) {
    robots = robots.map(robot => {
      let newPos = { x: robot.pos.x + robot.vel.x, y: robot.pos.y + robot.vel.y };
      if (newPos.x < 0) newPos.x += width;
      if (newPos.x >= width) newPos.x -= width;
      if (newPos.y < 0) newPos.y += height;
      if (newPos.y >= height) newPos.y -= height;
      return { pos: newPos, vel: robot.vel };
    });
  }

  let quadrants = [];
  for (let i = 0; i < 4; i++) {
    quadrants.push([]);
    for (let j = 0; j < (height - 1) / 2; j++) {
      quadrants[i].push([]);
      for (let k = 0; k < (width - 1) / 2; k++)
        quadrants[i][j].push(0);
    }
  }

  robots.forEach(robot => {
    if (robot.pos.x == (width - 1) / 2 || robot.pos.y == (height - 1) / 2) return;

    if (robot.pos.x < width / 2 && robot.pos.y < height / 2) quadrants[0][robot.pos.y][robot.pos.x]++;
    else if (robot.pos.x >= width / 2 && robot.pos.y < height / 2) quadrants[1][robot.pos.y][robot.pos.x - (width + 1) / 2]++;
    else if (robot.pos.x < width / 2 && robot.pos.y >= height / 2) quadrants[2][robot.pos.y - (height + 1) / 2][robot.pos.x]++;
    else quadrants[3][robot.pos.y - (height + 1) / 2][robot.pos.x - (width + 1) / 2]++;
  });

  let safety = quadrants.map(quadrant => quadrant.map(line => line.reduce((a, b) => a + b)).reduce((a, b) => a + b)).reduce((a, b) => a * b);
  return safety;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/g);
  const width = 101, height = 103;
  let robots = input.map(robot => ({
    pos: { x: +robot.split("=")[1].split(",")[0], y: +robot.split("=")[1].split(",")[1].split(" ")[0] },
    vel: { x: +robot.split("=")[2].split(",")[0], y: +robot.split("=")[2].split(",")[1].split(" ")[0] }
  }));

  function simulateSeconds(start, end = start + 1) {
    let newRobots = [], avgDistances = [];

    newRobots = robots.map(robot => {
      let newPos = { x: robot.pos.x + robot.vel.x * start, y: robot.pos.y + robot.vel.y * start };
      if (newPos.x < 0) newPos.x = width + newPos.x % width;
      if (newPos.x >= width) newPos.x %= width;
      if (newPos.y < 0) newPos.y = height + newPos.y % height;
      if (newPos.y >= height) newPos.y %= height;
      return { pos: newPos, vel: robot.vel };
    });

    for (let i = start; i < end; i++) {
      newRobots = newRobots.map(robot => {
        let newPos = { x: robot.pos.x + robot.vel.x, y: robot.pos.y + robot.vel.y };
        if (newPos.x < 0) newPos.x += width;
        if (newPos.x >= width) newPos.x -= width;
        if (newPos.y < 0) newPos.y += height;
        if (newPos.y >= height) newPos.y -= height;
        return { pos: newPos, vel: robot.vel };
      });

      let center = { x: (width - 1) / 2, y: (height - 1) / 2 }, distance = 0;
      newRobots.forEach(robot => distance += Math.sqrt((robot.pos.x - center.x) ** 2 + (robot.pos.y - center.y) ** 2));
      distance /= newRobots.length;
      avgDistances.push({ i, distance });
    }

    return { avgDistances, robots: newRobots };
  }

  const rl = require("readline").createInterface({ input: process.stdin, output: process.stdout, terminal: false }), confirm = async () => await new Promise(resolve => rl.question("Is this a Christmas tree? (y/N) ", resolve));

  let interval = 5000, start = 0, end = start + interval, simulation, tree;
  (async () => {
    do {
      simulation = simulateSeconds(start, end), tree = simulation.avgDistances.sort((a, b) => a.distance - b.distance)[0].i, start += interval, end += interval;

      let grid = [];
      for (let i = 0; i < height; i++) {
        grid.push([]);
        for (let j = 0; j < width; j++)
          grid[i][j] = 0;
      }
      simulateSeconds(tree).robots.forEach(robot => grid[robot.pos.y][robot.pos.x]++);

      console.log(grid.map(line => line.join("").replaceAll("0", ".")).join("\n"));
    } while ((await confirm()).toLowerCase() != "y");

    rl.close();
    console.log(tree + 1);
  })();
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
