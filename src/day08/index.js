import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const map = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

  const locations = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === ".") continue;
      if (!locations[map[y][x]]) locations[map[y][x]] = [];
      locations[map[y][x]].push([x, y]);
    }
  }

  const antinodes = [];
  const width = map[0].length;
  const height = map.length;
  for (const locs of Object.values(locations)) {
    if (locs.length <= 1) continue;

    for (let i = 0; i < locs.length; i++) {
      for (let j = 0; j < locs.length; j++) {
        if (i === j) continue;

        const loci = locs[i];
        const locj = locs[j];

        const antinode1 = [loci[0] * 2 - locj[0], loci[1] * 2 - locj[1]];
        if (antinodes.findIndex(x => x[0] === antinode1[0] && x[1] === antinode1[1]) < 0 &&
           antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) antinodes.push(antinode1);

        const antinode2 = [locj[0] * 2 - loci[0], locj[1] * 2 - loci[1]];
        if (antinodes.findIndex(x => x[0] === antinode2[0] && x[1] === antinode2[1]) < 0 &&
           antinode2[0] >= 0 && antinode2[1] >= 0 && antinode2[0] < width && antinode2[1] < height) antinodes.push(antinode2);
      }
    }
  }
  return antinodes.length
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const map = input.replace(/\r/g, "").split("\n").filter(x => x != "").map(x => x.split(""));

  const locations = {};
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] == ".") continue;
      if (!locations[map[y][x]]) locations[map[y][x]] = [];
      locations[map[y][x]].push([x, y]);
    }
  }

  const antinodes = [];
  const width = map[0].length;
  const height = map.length;
  for (const locs of Object.values(locations)) {
    if (locs.length <= 1) continue;

    for (let i = 0; i < locs.length; i++) {
      for (let j = 0; j < locs.length; j++) {
        if (i == j) continue;

        const loci = locs[i];
        const locj = locs[j];

        const antinode1 = [loci[0], loci[1]];
        while (antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) {
          antinode1[0] += loci[0] - locj[0];
          antinode1[1] += loci[1] - locj[1];
          if (antinodes.findIndex(x => x[0] === antinode1[0] && x[1] === antinode1[1]) < 0 &&
             antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) antinodes.push([antinode1[0], antinode1[1]]);
        }

        const antinode2 = [locj[0], locj[1]];
        while (antinode2[0] >= 0 && antinode2[1] >= 0 && antinode1[0] < width && antinode2[1] < height) {
          antinode2[0] += locj[0] - loci[0];
          antinode2[1] += locj[1] - loci[1];
          if (antinodes.findIndex(x => x[0] === antinode2[0] && x[1] === antinode2[1]) < 0 &&
             antinode1[0] >= 0 && antinode1[1] >= 0 && antinode1[0] < width && antinode1[1] < height) antinodes.push([antinode2[0], antinode2[1]]);
        }

        if (antinodes.findIndex(x => x[0] === loci[0] && x[1] === loci[1]) < 0) antinodes.push([loci[0], loci[1]]);
        if (antinodes.findIndex(x => x[0] === locj[0] && x[1] === locj[1]) < 0) antinodes.push([locj[0], locj[1]]);
      }
    }
  }

  return antinodes.length
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
