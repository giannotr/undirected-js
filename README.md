# undirected-js
JavaScript implementation of undirected graphs through adjacency lists

Refined and robust implementation with types of:
https://www.geeksforgeeks.org/implementation-graph-javascript/

https://www.npmjs.com/package/graphology
https://www.npmjs.com/package/graphlib
https://github.com/dagrejs/graphlib/wiki
https://www.npmjs.com/package/graphlibrary
https://github.com/dagrejs/graphlib/wiki
https://www.npmjs.com/package/undirected-graph
https://www.npmjs.com/package/graph

## Usage

```js
const graph = new Undirected();

// Or just
// const graph = new Undirected(people, friendship);
// whilst defining `people` and `friendship` upfront

const people = ['Alice', 'Bob', 'John', 'Jane'];

const friendship = [
  ['Alice', 'Bob'],
  ['Bob', 'John'],
  ['John', 'Alice'],
  ['Jane', 'John'],
  ['Jane', 'Alice'],
];

// Add bundled data
graph.addNodes(people);
graph.addEdges(friendship);

// Add single data points with the same methods
graph.addNodes('Solomon');
graph.addEdges(['Solomon', 'Bob']);

// Perform lookups
console.log(graph.bfs('Alice', 'Jane'));
console.log(graph.dfs('Alice', 'Solomon'));
```

