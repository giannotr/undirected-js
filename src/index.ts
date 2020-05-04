import TypeInsurance from 'type-insurance';

type Tuple = readonly [string, string];
type Nodes = string | readonly string[];
type Edges = Tuple | readonly Tuple[];
type AdjacencyList = Map<string, string[]>;
type LookupCallback = (x: string, y: number) => any;
type LookupResult = [number, string[]] | undefined;

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

	/* Remove nodes method
	removeNodes(keys: Nodes) {
		const { array } = new TypeInsurance(keys);
	}
	*/

	addEdges(pairs: Edges) {
		const matrix = (new TypeInsurance(pairs)).array;
		matrix.forEach((pair: Tuple) => {
			const [key1, key2] = pair;
			const value1 = this.graph.get(key1);
			const value2 = this.graph.get(key2);

			if(value1 && value2) {
				value1.push(key2);
				value2.push(key1);
			}
		});
	}

	/* Remove edges method
	removeEdges(pairs: Edges) {
		const matrix = (new TypeInsurance(pairs)).array;
		matrix.forEach((pair: Tuple) => {
			const [key1, key2] = pair;
			const value1 = this.graph.get(key1);
			const value2 = this.graph.get(key2);

			if(value1 && value2) {
				//value1.push(key2);
				//value2.push(key1);
			}
		});
	}
	*/

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
		checked = new Set(),
		steps = 0,
		path = [start],
	): LookupResult {
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
				return this.dfs(search, node, callback, checked, steps + 1, path);
			}
		}

		return undefined;
	}
}
