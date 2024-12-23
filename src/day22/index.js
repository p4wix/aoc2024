import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

function mix(a, b) {
  return a ^ b;
}

function prune(a) {
  return a % 16777216n;
}

function getDpIdx(sellPrices, ringBufStart) {
  let idx = 0;
  let base = 1;
  for(let i = 0; i < 4; ++i) {
    idx += base*(sellPrices[(i + ringBufStart) & 3]+9);
    base *= 19;
  }

  return idx;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/);

  let result = 0n;
  for(let secretNumS of input) {
    let secretNum = BigInt(secretNumS);

    for(let i = 0; i < 2000; ++i) {
      secretNum = prune(mix(secretNum, secretNum*64n));
      secretNum = prune(mix(secretNum, secretNum / 32n));
      secretNum = prune(mix(secretNum, secretNum*2048n));
    }

    result += secretNum;
  }

  return result;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/);
  const MASK = (1<<24)-1
  let dp = new Uint32Array(19**4);
  let dp2 = new Uint16Array(19**4);
  let prevSalePrices = new Int16Array(4);

  let lineNo = 0;
  for(let secretNumS of input) {
    ++lineNo;
    let secretNum = Number(secretNumS);

    let prevSalePrice = secretNum%10;
    let prevSalePriceIdx = 0;

    for(let i = 0; i < 2000; ++i) {
      secretNum = (secretNum ^ secretNum<<6) & MASK;
      secretNum = (secretNum ^ secretNum>>>5); //don't technically need to mask here
      secretNum = (secretNum ^ secretNum<<11) & MASK;

      let sellPrice = secretNum % 10;

      prevSalePrices[prevSalePriceIdx] = sellPrice-prevSalePrice;
      prevSalePriceIdx = ++prevSalePriceIdx&3;

      prevSalePrice = sellPrice;

      if(i >= 3) {
        let dpIdx = getDpIdx(prevSalePrices, prevSalePriceIdx);

        if(dp2[dpIdx] !== lineNo) {
          dp[dpIdx] += sellPrice;
          dp2[dpIdx] = lineNo;
        }
      }
    }
  }

  let max = 0;
  for(let val of dp) {
    if(val > max) {
      max = val;
    }
  }

  return max;
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
