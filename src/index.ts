import TypeInsurance from 'type-insurance';

type tuple = [string, string];
type nodes = string | string[];
type edges = tuple | tuple[];

export default class Undirected {
	public graph: Map<string, string[]>;

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
}
