import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

let DIRECTIONS = { "^": [ -1, 0 ], "v": [ 1, 0 ], "<": [ 0, -1 ], ">": [ 0, 1 ] },
   map = [], directions = [], instructions = false, pos;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/g);;

  input.forEach(line => {
    if (line == "") return instructions = true;
    if (instructions) return directions = [ ...directions, ...line.split("").map(direction => DIRECTIONS[direction]) ];
    map.push(line.split(""));
    if (line.indexOf("@") != -1) pos = [ map.length - 1, line.indexOf("@") ];
  });

  directions.forEach((direction, i) => {
    let next = [ pos[0] + direction[0], pos[1] + direction[1] ];
    if (map[next[0]][next[1]] == ".") {
      map[pos[0]][pos[1]] = ".";
      map[next[0]][next[1]] = "@";
      pos = next;
    } else if (map[next[0]][next[1]] == "O") {
      let spaces = 1;
      while (map[next[0] + direction[0] * spaces][next[1] + direction[1] * spaces] == "O") spaces++;
      if (map[next[0] + direction[0] * spaces][next[1] + direction[1] * spaces] == "#") return;
      map[pos[0]][pos[1]] = ".";
      map[next[0]][next[1]] = "@";
      map[ next[0] + direction[0] * spaces][next[1] + direction[1] * spaces ] = "O";
      pos = next;
    }
  });

  let gps = 0;
  map.forEach((line, i) => line.forEach((char, j) => gps += char == "O" ? 100 * i + j : 0));

  return gps;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/g);

  input.forEach(line => {
    if (line == "") return instructions = true;
    if (instructions) return directions = [ ...directions, ...line.split("").map(direction => DIRECTIONS[direction]) ];
    let row = [];
    line.split("").forEach(char => {
      if (char == "#") row.push(...[ "#", "#" ]);
      if (char == ".") row.push(...[ ".", "." ]);
      if (char == "O") row.push(...[ "[", "]" ]);
      if (char == "@") row.push(...[ "@", "." ]);
    });
    map.push(row);
    if (line.indexOf("@") != -1) pos = [ map.length - 1, line.indexOf("@") * 2 ];
  });

  const findNextOpen = direction => {
    let box;
    switch (direction) {
      case DIRECTIONS["^"]: return next => {
        box = [ next[0] - 1, next[1] ];
        if (map[box[0]][box[1]] == "#") return -1;
        if (map[box[0]][box[1]] == "[" || map[box[0]][box[1]] == "]") box = findNextOpen(DIRECTIONS["^"])(box);
        return box;
      }
      case DIRECTIONS["v"]: return next => {
        box = [ next[0] + 1, next[1] ];
        if (map[box[0]][box[1]] == "#") return -1;
        if (map[box[0]][box[1]] == "[" || map[box[0]][box[1]] == "]") box = findNextOpen(DIRECTIONS["v"])(box);
        return box;
      }
      case DIRECTIONS["<"]: return next => {
        box = [ next[0], next[1] - 1 ];
        if (map[box[0]][box[1]] == "#") return -1;
        if (map[box[0]][box[1]] == "]") box = findNextOpen(DIRECTIONS["<"])([ box[0], box[1] - 1 ]);
        return box;
      }
      case DIRECTIONS[">"]: return next => {
        box = [ next[0], next[1] + 1 ];
        if (map[box[0]][box[1]] == "#") return -1;
        if (map[box[0]][box[1]] == "[") box = findNextOpen(DIRECTIONS[">"])([ box[0], box[1] + 1 ]);
        return box;
      }
    }
  }

  function findConnectedBoxes(box, direction) {
    let touching = new Set();
    if (map[box[0]][box[1]] == "[") {
      if (map[box[0] + direction[0]][box[1]] == "[") touching.add(`${box[0] + direction[0]},${box[1]}`);
      if (map[box[0] + direction[0]][box[1]] == "]") touching.add(`${box[0] + direction[0]},${box[1] - 1}`);
      if (map[box[0] + direction[0]][box[1] + 1] == "[") touching.add(`${box[0] + direction[0]},${box[1] + 1}`);
    }
    return [ ...touching.values() ].map(box => box.split(",").map(n => +n));
  }

  function buildLayerMap(box, direction) { // this function. this was what made me almost give up. i couldn't figure out how to write it for like 2 hours. 2 HOURS!!
    if (map[box[0]][box[1]] == "]") box = [ box[0], box[1] - 1 ];
    let layers = [ new Set([ `${box[0]},${box[1]}` ]) ];
    do {
      layers.push(new Set());
      layers.at(-2).forEach(box => findConnectedBoxes(box.split(",").map(n => +n), direction).forEach(box => layers.at(-1).add(`${box[0]},${box[1]}`)));
    } while (layers.at(-1).size);
    layers = layers.splice(0, layers.length - 1);
    return layers.map(layer => [ ...layer.values() ].map(box => box.split(",").map(n => +n)));
  }

  function calculateBoxMovement(pos, direction) {
    let next = [ pos[0] + direction[0], pos[1] + direction[1] ], box = findNextOpen(direction)(pos); // idk why i called the variable box. too lazy to change it now.
    if (box == -1) return false;

    if (direction == DIRECTIONS["^"]) {
      let boxCoordinates = [ [...next] ]; // i shouldn't have called it box since now this is next and that makes no sense
      if (map[next[0]][next[1]] == "[") boxCoordinates.push([ next[0], next[1] + 1 ]);
      else boxCoordinates = [ [ next[0], next[1] - 1 ], ...boxCoordinates ];

      let layerMap = buildLayerMap(next, direction);
      for (let i = layerMap.length - 1; i >= 0; i--) {
        let layer = layerMap[i];
        for (let j = 0; j < layer.length; j++)
          if (map[layer[j][0] - 1][layer[j][1]] == "#" || map[layer[j][0] - 1][layer[j][1] + 1] == "#") return false; // return false if ANY of the boxes will hit a wall (scan from top to bottom) - i'm surprised this worked
      }

      for (let i = layerMap.length - 1; i >= 0; i--) {
        let layer = layerMap[i];
        for (let j = 0; j < layer.length; j++) {
          let box = layer[j];
          map[box[0]][box[1]] = ".";
          map[box[0]][box[1] + 1] = ".";
          map[box[0] - 1][box[1]] = "[";
          map[box[0] - 1][box[1] + 1] = "]";
        }
      }

      return true;
    } else if (direction == DIRECTIONS["v"]) {
      let boxCoordinates = [ [...next] ];
      if (map[next[0]][next[1]] == "[") boxCoordinates.push([ next[0], next[1] + 1 ]);
      else boxCoordinates = [ [ next[0], next[1] - 1 ], ...boxCoordinates ];

      let layerMap = buildLayerMap(next, direction);
      for (let i = layerMap.length - 1; i >= 0; i--) {
        let layer = layerMap[i];
        for (let j = 0; j < layer.length; j++)
          if (map[layer[j][0] + 1][layer[j][1]] == "#" || map[layer[j][0] + 1][layer[j][1] + 1] == "#") return false;
      }

      for (let i = layerMap.length - 1; i >= 0; i--) {
        let layer = layerMap[i];
        for (let j = 0; j < layer.length; j++) {
          let box = layer[j];
          map[box[0]][box[1]] = ".";
          map[box[0]][box[1] + 1] = ".";
          map[box[0] + 1][box[1]] = "[";
          map[box[0] + 1][box[1] + 1] = "]";
        }
      }

      return true;
    } else if (direction == DIRECTIONS["<"]) {
      let pointer = pos[1]; // since i'm too lazy to actually *move* the boxes, the pointer just flips them from [ to ] and vice versa; the first . becomes the new @ and the last . becomes a ] because it has to be an end-box (that's what i'm calling it)
      while (pointer >= box[1]) {
        if (map[pos[0]][pointer] == "]") map[pos[0]][pointer] = "[";
        else if (map[pos[0]][pointer] == "[") map[pos[0]][pointer] = "]";
        else map[pos[0]][pointer] = "[";
        pointer--;
      }
      return true;
    } else if (direction == DIRECTIONS[">"]) {
      let pointer = pos[1];
      while (pointer <= box[1]) {
        if (map[pos[0]][pointer] == "]") map[pos[0]][pointer] = "[";
        else if (map[pos[0]][pointer] == "[") map[pos[0]][pointer] = "]";
        else map[pos[0]][pointer] = "]";
        pointer++;
      }
      return true;
    }
  }

  directions.forEach((direction, i) => {
    let next = [ pos[0] + direction[0], pos[1] + direction[1] ];
    if (map[next[0]][next[1]] == "#") return;
    if (map[next[0]][next[1]] == ".") {
      map[pos[0]][pos[1]] = ".";
      map[next[0]][next[1]] = "@";
    } else {
      if (!calculateBoxMovement(pos, direction)) return;
      map[pos[0]][pos[1]] = ".";
      map[next[0]][next[1]] = "@";
    }
    pos = next;
  });

  let gps = 0;
  map.forEach((line, i) => line.forEach((char, j) => gps += char == "[" ? 100 * i + j : 0));

  return gps;
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
