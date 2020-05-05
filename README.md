# UndirectedJS

> JavaScript implementation of undirected graphs through adjacency lists

This package is mainly a refined and robust implementation with types of:

https://www.geeksforgeeks.org/implementation-graph-javascript/

It is meant to provide an easy and accessible ("out-of-the-box") work flow and to be minimal.

While there is an array of existing solutions for the given task, they all seem to "fail" for specific reasons - considering the targeted usage paradigm:

- [graphology](https://www.npmjs.com/package/graphology) as a whole specification is over scoped.
- [graphlib](https://www.npmjs.com/package/graphlib) as a complete solution for either directed and undirected graphs with tons of admittedly elaborate features is far away from being minimal.
- Then there are a few packages who look not taken care of a lot and/or abandoned: graphlibrary (a fork from graphlib), undirected-graph, graph.

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

## API

### Constructor: `new Undirected(nodes?: Nodes, edges?: Edges)`

Creates a new instance of an undirected graph from the given `nodes` and `edges`. Both can be given as implicit singletons (a single string for a node or an array of two strings for an edge) or an array of strings for the nodes or a list of arrays for the edges. Specifically, the edges are passed as a list of connections beetwen any two edges, i.e. `['nodeA', 'nodeB']` (or `[['node1', 'node2'], ...]`).

### Properties

#### .graph

Returns the (current) `Map` representation of the undirected graph, i.e. the adjacency list.

### Methods

#### addNodes

▸ **addNodes**(`keys`: Nodes)

Add a node or a set of nodes to the graph.

#### addEdges

▸ **addEdges**(`pairs`: Edges)

Add an edge or a set of edges to the graph.

#### bfs

▸ **bfs**(`search`: string, `start`: string, `callback?`: LookupCallback): LookupResult

Performs a breadth-first search. If the lookup is successful, the callback is invoked with the `search` and path length (from `start` to `search`) and an array containing the path length and the path is returned. Otherwise the method returns `undefined`.

#### dfs

▸ **dfs**(`search`: string, `start`: string, `callback?`: LookupCallback): LookupResult

Performs a depth-first search. If the lookup is successful, the callback is invoked with the `search` and path length (from `start` to `search`) and an array containing the path length and the path is returned. Otherwise the method returns `undefined`.

## Keywords

- undirected
- graphs
- graph
- theory
- network
- path
- algorithm
- data
- structures

## Dependencies

- [type-insurance](https://www.npmjs.com/package/type-insurance)

## Related

- [graphology](https://www.npmjs.com/package/graphology) - a specification for a robust & multipurpose JavaScript Graph object
- [graphlib](https://www.npmjs.com/package/graphlib) - Graphlib is a JavaScript library that provides data structures for undirected and directed multi-graphs
- [graphlibrary](https://www.npmjs.com/package/graphlibrary) - based on dagrejs/graphlib (see above)
- [undirected-graph](https://www.npmjs.com/package/undirected-graph) - Graph data structure with basic functionality
- [graph](https://www.npmjs.com/package/graph) - a simple Javascript library for manipulating directed and undirected graphs

## Maintainer

- Ruben Giannotti - ruben.giannotti@gmx.net - github.com/giannotr
