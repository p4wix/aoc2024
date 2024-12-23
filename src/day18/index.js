import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

let DIRECTIONS_1 = [[0, 1], [0, -1], [1, 0], [-1, 0]]
let DIRECTIONS = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, -1], [1, -1], [-1, 1]]

const NORTH = 0, EAST = 1, SOUTH = 2, WEST = 4;
const CONFLICTS = new Array(16).fill(true);

CONFLICTS[NORTH] = false;
CONFLICTS[EAST] = false;
CONFLICTS[SOUTH] = false;
CONFLICTS[WEST] = false;
CONFLICTS[NORTH | EAST] = false;
CONFLICTS[WEST | SOUTH] = false;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/);
  let rows = 71;
  let cols = 71;
  let grid = new Array(rows).fill(0).map(x => new Array(cols).fill(0));

  for(let line of input.slice(0, 1024)) {
    let [x, y] = line.split(',').map(Number);
    grid[y][x] = 1;
  }

  let steps = [];
  let q = [[0, 0]];
  let q2 = [];

  while(q.length) {
    let [x, y] = q.pop();
    if(x === (rows-1) && y === (cols-1)) {
      return steps;
    }

    for(let [xOff, yOff] of DIRECTIONS_1) {
      let newX = x+xOff;
      let newY = y+yOff;

      if(newX < 0 || newY < 0 || newX >= cols || newY >= rows) { continue; }

      if(grid[newX][newY] !== 0) { continue; }
      grid[newX][newY] = 2;


      if(newX === (rows-1) && newY === (cols-1)) {
        return steps+1;
      }

      q2.push([newX, newY]);
    }

    if(!q.length) {
      [q, q2] = [q2, q];
      ++steps;
    }
  }

  return -1;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/);
  let rows = 71;
  let cols = 71;

  let mat = new Uint32Array(rows*cols).fill(0);

  let groups = [0];
  let groupSides = [[]];

  for(let line of input) {
    let [x, y] = line.split(',').map(Number);

    if((x === 0 && y === 0) || (x === (cols-1) && y === (rows-1))) {
      return line;
    }

    let idx = x + y*cols;
    if(mat[idx] > 0) { continue; } //already seen


    for(let [xOff, yOff] of DIRECTIONS) {
      let newX = x + xOff;
      let newY = y + yOff;

      if(newX < 0 || newY < 0 || newX >= cols || newY >= cols) { continue; }

      let idx2 = newX + newY*cols;

      if(mat[newX + newY*cols]) {
        union(idx, idx2);
      }
    }

    let group;
    if(mat[idx] < 1) {
      group = groups.length;
      mat[idx] = group;
      groups.push(group);
      groupSides.push(0);
    } else {
      group = findRoot(idx);
    }
    let side = getSide(x, y);
    if(side !== null) {
      groupSides[group] |= side;
    }

    if(inConflict(groupSides[group])) {
      return line;
    }
  }

  return -1;

  function getSide(x, y) {
    if(x === 0) { return WEST; }
    if(y === 0) { return NORTH; }
    if(x === (cols-1)) { return EAST; }
    if(y === (rows-1)) { return SOUTH; }
    return null;
  }
  function inConflict(sides) {
    return CONFLICTS[sides];
  }
  function findRoot(idx) {
    let group = mat[idx];

    while(groups[group] !== group) {
      group = groups[group];
    }

    return group;
  }
  function union(idx1, idx2) {
    if(!mat[idx1]) {
      mat[idx1] = findRoot(idx2);
    }

    let g1 = findRoot(idx1);
    let g2 = findRoot(idx2);

    if(g1 !== g2) {
      groups[g1] = g2;
      groupSides[g2] |= groupSides[g1];
    }
  }
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
