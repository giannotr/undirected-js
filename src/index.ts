import TypeInsurance from 'type-insurance';

export default class Undirected {
	public graph: Map;

  constructor(nodes: string | any[], edges: any[][]) {
		this.graph = new Map();
		
		this.addNodes(nodes);
	}

	addNodes(keys: any) {
		const { array } = new TypeInsurance(keys);
		array.forEach((key: any) => this.graph.set(key, []));
	}
}
