import TypeInsurance from 'type-insurance';

type tuple = [string, string];
type nodes = string | string[];
type edges = tuple | tuple[];
type adjacencyList = Map<string, string[]>;
type lookupResult = [number, string[]] | undefined;

export default class Undirected {
	public graph: adjacencyList;

  constructor(nodes: nodes, edges: edges) {
		this.graph = new Map();
		
		this.addNodes(nodes);
		this.addEdges(edges);
	}

	addNodes(keys: nodes) {
		const { array } = new TypeInsurance(keys);
		array.forEach((key: string) => this.graph.set(key, []));
	}

	addEdges(pairs: edges) {
		const matrix = (new TypeInsurance(pairs)).array;
		matrix.forEach((pair: tuple) => {
			const [key1, key2] = pair;
			this.graph.get(key1).push(key2);
			this.graph.get(key2).push(key1);
		});
	}

	bfs(
		list: adjacencyList,
		search: string,
		start: string,
		callback = (x: string, y: number) => {},
	): lookupResult {
		const queue = [start];
		const checked = new Set();
		const path = [];
		
		while(queue.length > 0) {
			const _current = queue.shift();
			const _nodes = list.get(_current);
			
			for(const node of _nodes) {       
				if(node === search) {
					const _path = [start, ...path, search];
					const { number } = new TypeInsurance(_path.length - 1)
					callback(search, number);
					return [number, _path];
				}
				
				if(!checked.has(node)) {
					checked.add(node);
					queue.push(node);
					path.push(node);
				}
			}
		}
		
		return undefined;
	}
}
