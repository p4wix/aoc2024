import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split("").map(x => +x);

  let disk = [], id = 0;
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < input[i]; j++) disk.push(id);
      id++;
    } else for (let j = 0; j < input[i]; j++) disk.push(".");
  }

  for (let i = disk.length - 1; i >= 0; i--) {
    if (disk[i] === "." || disk.indexOf(".") > i) continue;
    disk[disk.indexOf(".")] = disk[i];
    disk[i] = ".";
  }

  let checksum = 0;
  for (let i = 0; i < disk.length; i++)
    if (disk[i] !== ".") checksum += i * disk[i];
  return checksum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split("").map(x => +x);

  let disk = [], id = 0;
  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) disk.push({ id: id++, length: input[i] });
    else disk.push({ id: ".", length: input[i] });
  }

  for (let i = id - 1; i >= 0; i--) {
    let file = disk.findIndex(block => block.id === i),
       free = disk.findIndex(block => block.id === "." && block.length >= disk[file].length);
    if (!disk[free] || file < free) continue;
    if (disk[free].length > disk[file].length) {
      disk = [ ...disk.slice(0, free), { id: disk[file].id, length: disk[file].length }, { id: ".", length: disk[free].length - disk[file].length }, ...disk.slice(free + 1) ];
      disk[file + 1].id = ".";
    } else if (disk[free].length === disk[file].length) {
      disk[free].id = disk[file].id;
      disk[file].id = ".";
    }
  }

  for (let j = 0; j < disk.length - 1; j++)
    if (disk[j].id === "." && disk[j + 1].id === ".")
      disk = [ ...disk.slice(0, j), { id: ".", length: disk[j].length + disk[j + 1].length }, ...disk.slice(j-- + 2) ];

  let block = 0, checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i].id === ".") block += disk[i].length;
    else {
      for (let j = 0; j < disk[i].length; j++) {
        checksum += block * disk[i].id;
        block++;
      }
    }
  }

  return checksum;
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
