import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let registerFile = {
    A: 0,
    B: 0,
    C: 0
  };

  let [regsS, programS] = input.split(/(?:\r?\n){2}/);
  for(let line of regsS.split('\n')) {
    let [_, reg, val] = line.match(/Register (\w+): (\d+)$/);
    registerFile[reg] = Number(val);
  }

  let outputs = [];
  let pc = 0;
  let dataSection = programS.split(': ')[1].split(',').map(Number);
  while(pc < dataSection.length) {
    let [instruction, operand] = [dataSection[pc], dataSection[pc+1]];

    if(instruction === 0) {
      registerFile.A = Math.floor(registerFile.A/2**getCombo(operand));
    } else if(instruction === 1) {
      registerFile.B ^= operand;
    } else if(instruction === 2) {
      registerFile.B = getCombo(operand) % 8;
    } else if(instruction === 3) {
      if(registerFile.A !== 0) {
        pc = operand - 2;
      }
    } else if(instruction === 4) {
      registerFile.B ^= registerFile.C;
    } else if(instruction === 5) {
      outputs.push(getCombo(operand) % 8);
    } else if(instruction === 6) {
      registerFile.B = Math.floor(registerFile.A/2**getCombo(operand));
    } else if(instruction === 7) {
      registerFile.C = Math.floor(registerFile.A/2**getCombo(operand));
    }
    pc += 2;
  }

  return outputs.join(',')


  function getCombo(operand) {
    if(operand <= 3) {
      return operand;
    } else if(operand === 4) {
      return registerFile.A;
    } else if(operand === 5) {
      return registerFile.B;
    } else if(operand === 6) {
      return registerFile.C;
    } else {
      throw new Error('uhoh');
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let registerFile = {
    A: BigInt(0),
    B: BigInt(0),
    C: BigInt(0)
  };

  let [regsS, programS] = input.split(/(?:\r?\n){2}/);
  for(let line of regsS.split('\n')) {
    let [_, reg, val] = line.match(/Register (\w+): (\d+)$/);
    registerFile[reg] = Number(val);
  }

  let dataSection = programS.split(': ')[1].split(',').map(Number);

  return dfs(0n, 0);

  function dfs(curNum, i) {
    if(i >= dataSection.length) { return curNum; }

    let curPow = 3n;
    for(let ii = 0n; ii < 8n; ++ii) {
      let tmp = (curNum<<curPow) + ii;

      let b = (tmp & 7n) ^ 1n;
      let c = tmp / (2n**b);
      let b2 = b ^ c ^ 5n;
      let out = b2 & 7n
      let num = Number(out);
      if(num === dataSection.at(-1 - i)) {
        let ret = dfs(tmp, i+1);
        if(ret !== false) { return ret; }
      }
    }
    return false;
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
