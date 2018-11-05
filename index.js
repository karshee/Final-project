let problem = {
  start: {A: 5, B: 2},
  A: {C: 4, D: 20},
  B: {A: 8, D: 7},
  C: {D: 6, finish: 3},
  D: {finish: 1},
  finish: {}
};

const lowestCostNode = (costs, processed) => {
  return Object.keys(costs).reduce((lowest, node) => {
    if (lowest === null || costs[node] < costs[lowest]) {
      if (!processed.includes(node)) {
        lowest = node;
      }
    }
    return lowest;
  }, null);
};

// function that returns the minimum cost and path to reach Finish
let dijkstra = (graph) => {

  // track lowest cost to reach each node
  let costs = Object.assign({finish: Infinity}, graph.start);

  // track paths
  let parents = {finish: null};
  for (let child in graph.start) {
    parents[child] = 'start';
  }

  // track nodes that have already been processed
  let processed = [];

  let node = lowestCostNode(costs, processed);

  while (node) {
    let cost = costs[node];
    let children = graph[node];
    for (let n in children) {
      let newCost = cost + children[n];
      if (!costs[n]) {
        costs[n] = newCost;
        parents[n] = node;
      }
      if (costs[n] > newCost) {
        costs[n] = newCost;
        parents[n] = node;
      }
    }
    processed.push(node);
    node = lowestCostNode(costs, processed);
  }

  let optimalPath = ['finish'];
  let parent = parents.finish;
  while (parent) {
    optimalPath.push(parent);
    parent = parents[parent];
  }
  optimalPath.reverse();

    let results = {
    distance: costs,
    path: optimalPath
  };


  return results;
};

let results = dijkstra(problem);

console.log(results);

// for loop

for (i = 0 ; i < results.path.length ; i++){

  let path1 = results.path[i];
  let path11 = 0;
  if (i < results.path.length)
  {
   path11 = results.path[i+1];
  }

  let x = Math.abs(problem[`${path1}`][`${path11}`]); // cost between path1 and path11

  x += Math.exp((0.5*x)-3); // adding to value
  problem[`${path1}`][`${path11}`] = x;

}



/* //1st iteration
  let path1 = results.path[0];
  let path11 = results.path[1];

  let x = Math.abs(problem[`${path1}`][`${path11}`]); // cost between path1 and path11

  x += Math.exp((0.5*x)-3); // adding to value
  problem[`${path1}`][`${path11}`] = x;

// 2nd iteration
  path1 = results.path[1];
  path11 = results.path[2];

  x = Math.abs(problem[`${path1}`][`${path11}`]); // cost between path1 and path11

  x += Math.exp((0.5*x)-3); // adding to value
  problem[`${path1}`][`${path11}`] = x; */

  // 1. needs to be a for loop but an if on (i+1) incase it goes past 4(or max path)
  // 2. needs to take all other paths and lower their prices


console.log(problem);

// let x = 1;
// console.log(Math.exp(x-3));

