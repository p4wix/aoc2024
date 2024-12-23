import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/);
  let v_sToV = new Map();
  let tVertices = [];
  let adjList = [];
  for(let line of input) {
    let [v1s, v2s] = line.split('-');

    if(!v_sToV.has(v1s)) {  v_sToV.set(v1s, v_sToV.size); }
    if(!v_sToV.has(v2s)) {  v_sToV.set(v2s, v_sToV.size); }

    let v1 = v_sToV.get(v1s);
    let v2 = v_sToV.get(v2s);

    if(v1s.startsWith('t')) {
      tVertices[v1] = true;
    }
    if(v2s.startsWith('t')) {
      tVertices[v2] = true;
    }

    adjList[v1] ||= [];
    adjList[v2] ||= [];

    adjList[v1].push(v2);
    adjList[v2].push(v1);
  }

  let seen = new Set();

  let dpWidth1 = adjList.length;
  let dpWidth2 = adjList.length*adjList.length;

  for(let v1 = 0; v1 < adjList.length; ++v1) {
    if(!tVertices[v1]) { continue; }

    let list1 = adjList[v1];

    for(let i = 0; i < list1.length; ++i) {
      let v2 = list1[i];
      let list2 = adjList[v2];

      for(let j = i+1; j < list1.length; ++j) {
        let v3 = list1[j];
        let list3 = adjList[v3];

        if(list2.includes(v3) && list3.includes(v2)) {
          let dpIdx0 = Math.min(v1, v2, v3);
          let dpIdx2 = Math.max(v1, v2, v3);
          let dpIdx1 = v1+v2+v3 - (dpIdx0+dpIdx2);

          seen.add(dpIdx0 + dpIdx1*dpWidth1 + dpIdx2*dpWidth2)
        }
      }
    }
  }


  return seen.size;
  return;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput).split(/\r?\n/);
  const EMPTY_LIST = [];

  let adjList = {};
  for(let line of input) {
    let [v1, v2] = line.split('-');

    adjList[v1] ||= [];
    adjList[v2] ||= [];

    adjList[v1].push(v2);
    adjList[v2].push(v1);
  }

  let max = [];

  for(let v1 of Object.keys(adjList)) {
    let curMax = dfs(v1, 0, [v1])
    if(curMax.length > max.length) {
      max = curMax;
    }
  }

  return max.sort().join(',');

  function dfs(v0, i, path) {
    let list = adjList[v0];

    if(i >= list.length) {
      if(path.length > max.length) {
        return path.slice();
      }
      return EMPTY_LIST;
    }

    let best = path.slice();
    for(; i < list.length; ++i) {
      //include i
      let v2 = list[i];
      let match = true;

      //already visited this in the out Object.keys loop....
      if(v2 < v0) { continue; }

      for(let j = 1; j < path.length; ++j) {
        if(!adjList[path[j]].includes(v2)) { match = false; break; }
      }
      if(!match) { continue; }

      path.push(v2);
      let ret = dfs(v0, i+1, path);
      if(ret.length > best.length) {
        best = ret;
      }
      path.pop();
    }

    return best;
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
