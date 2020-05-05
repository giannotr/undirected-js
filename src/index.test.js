const Undirected = require('.').default;

const friendsNetwork = new Undirected();

test('empty graph', () => {
	expect(friendsNetwork.graph).toEqual(new Map());
});

test('non-empty graph', () => {
	const people = ['Alice', 'Bob', 'John', 'Jane'];
	const friendship = [
		['Alice', 'Bob'],
		['Bob', 'John'],
		['John', 'Alice'],
		['Jane', 'John'],
		['Jane', 'Alice'],
	];

	friendsNetwork.addNodes(people);
	friendsNetwork.addEdges(friendship);

	expect(friendsNetwork.graph).toEqual(new Map([
		[
			"Alice", [
				"Bob",
				"John",
				"Jane",
			]
		],
		[
			"Bob", [
				"Alice",
				"John",
			]
		],
		[
			"Jane", [
				"John",
				"Alice",
			]
		],
		[
			"John", [
				"Bob",
				"Alice",
				"Jane",
			]
		],
	]));

	expect(friendsNetwork.bfs('Alice', 'Bob')).toEqual([1, ['Bob', 'Alice']]);
	expect(friendsNetwork.dfs('Alice', 'Bob')).toEqual([1, ['Bob', 'Alice']]);
	expect(friendsNetwork.bfs('Alice', 'John')).toEqual([2,['John', 'Bob', 'Alice']]);
	expect(friendsNetwork.dfs('Alice', 'John')).toEqual([2, ['John', 'Bob', 'Alice']]);
	expect(friendsNetwork.bfs('Bob', 'Jane')).toEqual([3,['Jane', 'John', 'Alice', 'Bob']]);
	expect(friendsNetwork.dfs('Bob', 'Jane')).toEqual([2, ['Jane', 'John', 'Bob']]);
	expect(friendsNetwork.bfs('Alice', 'Bob', (search, n) => console.log(`found ${search} after ${n} steps`)))
		.toEqual([1, ['Bob', 'Alice']]);
	expect(friendsNetwork.dfs('Alice', 'Bob', (search, n) => console.log(`found ${search} after ${n} steps`)))
		.toEqual([1, ['Bob', 'Alice']]);
});

test('unconnected nodes', () => {
	const people = ['Alice', 'Bob', 'John', 'Jane'];
	const friendship = [
		['Alice', 'Jane'],
		['Bob', 'John'],
	];

	friendsNetwork.addNodes(people);
	friendsNetwork.addEdges(friendship);

	expect(friendsNetwork.bfs('Bob', 'Jane')).toEqual(undefined);
	expect(friendsNetwork.dfs('Alice', 'Bob')).toEqual(undefined);
});

test('search with unknown start node', () => {
	const people = ['Alice', 'Bob', 'John', 'Jane'];
	const friendship = [
		['Alice', 'Jane'],
		['Bob', 'John'],
	];

	friendsNetwork.addNodes(people);
	friendsNetwork.addEdges(friendship);

	expect(friendsNetwork.bfs('Alice', 'Christina')).toEqual(undefined);
	expect(friendsNetwork.dfs('Bob', 'Christina')).toEqual(undefined);
});

test('initialize graph with values', () => {
	const example = new Undirected('A', [['A', 'A']]);

	expect(example.graph).toEqual(new Map([['A', ['A', 'A']]]));
});

test('remove nodes', () => {
	const people = ['Alice', 'Bob'];

	const smallNetwork = new Undirected(people, [people]);

	expect(smallNetwork.graph).toEqual(new Map([
		['Alice', ['Bob']], ['Bob', ['Alice']]
	]));

	smallNetwork.removeEdges([people]);

	expect(smallNetwork.graph).toEqual(new Map([
		['Alice', []], ['Bob', []]
	]));
});
