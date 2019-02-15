// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import ChartistGraph from 'react-chartist';

export default class swellGraph extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let lineChartData = {
			labels: [1, 2, 3, 4, 5, 6, 7, 8],
			series: [
			  [5, 9, 7, 8, 5, 3, 5, 4]
			]
		  };

		  let lineChartOptions = {
			low: 0,
			showArea: true,
			showLine: false,
			showPoint: false,
			axisX: {
				showLabel: false,
				showGrid: false
			},
			axisY: {
				showLabel: false,
				showGrid: false
			}
		  };
		return <ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'}/>;

	}

	componentDidMount() {

	}
}