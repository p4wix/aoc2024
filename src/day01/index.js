import run from 'aocrunner';

const parseInput = rawInput => rawInput;

const part1 = rawInput => {
  const input = parseInput(rawInput);
  const [array1, array2] = input
     .trim()
     .split('\n')
     .reduce(
        ([arr1, arr2], line) => {
          const [num1, num2] = line.trim().split(/\s+/).map(Number);
          arr1.push(num1);
          arr2.push(num2);
          return [arr1, arr2];
        },
        [[], []],
     );

  let ans = 0;
  const arrLength = array1.length;

  // * Pętla po wszystkich elementach tablicy *
  for (let index = 0; index < arrLength; index++) {
    // * Szukanie elementu minimalnego z pierwszej i drugiej tablicy oraz zapisywanie ich indeksów *

    let idxMinArr1 = array1.indexOf(Math.max(...array1));
    let valueMinArr1 = Math.max(...array1);

    let idxMinArr2 = array2.indexOf(Math.max(...array2));
    let valueMinArr2 = Math.max(...array2);

    ans += Math.abs(valueMinArr1 - valueMinArr2);

    // * Usunięcie elemntu z tablic *
    array1.splice(idxMinArr1, 1);
    array2.splice(idxMinArr2, 1);
  }

  return ans;
};

const part2 = rawInput => {
  const input = parseInput(rawInput);
  const [array1, array2] = input
     .trim()
     .split('\n')
     .reduce(
        ([arr1, arr2], line) => {
          const [num1, num2] = line.trim().split(/\s+/).map(Number);
          arr1.push(num1);
          arr2.push(num2);
          return [arr1, arr2];
        },
        [[], []],
     );

  let ans = 0;

  array1.forEach(item => {
    const numOfOccurrences = array2.filter(x => x === item).length;
    ans += item * numOfOccurrences;
  });

  return ans;
};

run({
  part1: {
    tests: [],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
