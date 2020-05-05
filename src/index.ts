import TypeInsurance from 'type-insurance';

type Tuple = readonly [string, string];
type Nodes = string | readonly string[];
type Edges = readonly Tuple[];
type AdjacencyList = Map<string, string[]>;
type LookupCallback = (x: string, y: number) => any;
type LookupResult = [number, string[]] | undefined;
type DfsMemory = {
	checked: Set<string>;
	steps: number;
	path: string[];
}

export default class Undirected {
	public graph: AdjacencyList;

	constructor(nodes?: Nodes, edges?: Edges) {
		this.graph = new Map();

		if(nodes) {
			this.addNodes(nodes);
		}

		if(edges) {
			this.addEdges(edges);
		}
	}

	addNodes(keys: Nodes) {
		const { array } = new TypeInsurance(keys);
		array.forEach((key: string) => this.graph.set(key, []));
	}

	addEdges(pairs: Edges) {
		const { graph } = this;

		pairs.forEach((pair: Tuple) => {
			const [key1, key2] = pair;
			const value1 = graph.get(key1);
			const value2 = graph.get(key2);

			if(value1 && value2) {
				value1.push(key2);
				value2.push(key1);
			}
		});
	}

	removeNodes(keys: Nodes) {
		const { array } = new TypeInsurance(keys);
		const { graph } = this;

		array.forEach((_key: string) => {
			graph.forEach((value, key, map) => {
				map.set(key, value.filter(item => item !== _key));
			});

			graph.delete(_key);
		});
	}

	removeEdges(pairs: Edges) {
		const { graph } = this;

		pairs.forEach((pair: Tuple) => {
			const [key1, key2] = pair;
			const value1 = graph.get(key1);
			const value2 = graph.get(key2);

			if(value1 && value2) {
				graph.set(key1, value1.filter(item => item !== key2));
				graph.set(key2, value2.filter(item => item !== key1));
			}
		});
	}

	bfs(
		search: string,
		start: string,
		callback?: LookupCallback,
	): LookupResult {
		const queue = [start];
		const checked = new Set();
		const path = [];

		while(queue.length > 0) {
			const _current = queue.shift();

			if(_current) {
				const _nodes = this.graph.get(_current) ?? [];

				for(const node of _nodes) {
					if(node === search) {
						const _path = [start, ...path, search];
						const { number } = new TypeInsurance(_path.length - 1);

						if(callback) {
							callback(search, number);
						}

						return [number, _path];
					}

					if(!checked.has(node)) {
						checked.add(node);
						queue.push(node);
						path.push(node);
					}
				}
			}
		}

		return undefined;
	}

	dfs(
		search: string,
		start: string,
		callback?: LookupCallback,
		memory?: DfsMemory,
	): LookupResult {
		let checked: Set<string>;
		let steps: number;
		let path: string[];

		if(memory) {
			checked = memory.checked;
			steps = memory.steps;
			path = memory.path;
		} else {
			checked = new Set();
			steps = 0;
			path = [start];
		}

		checked.add(start);

		const _nodes = this.graph.get(start) ?? [];

		for(const node of _nodes) {
			path.unshift(node);

			if(node === search) {
				steps++;

				if(callback) {
					callback(search, steps);
				}

				return [steps, path.reverse()];
			}

			if(!checked.has(node)) {
				return this.dfs(search, node, callback, { checked, steps: steps + 1, path });
			}
		}

		return undefined;
	}
}
