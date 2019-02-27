// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class swellGraph extends Component {
	constructor(props) {
		super(props);
	}

	// getPoints(height, period, maxHight, minHeight){
	// 	let points = [];



	// 	for(var i = 0; i < 10; i++){

	// 	}
	// }

	render() {
		let lineChartData = {
			labels: [1, 1.5, 2, 2.5],
			series: [
			  [5,3,5,3]
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

		  let styles = {
			  fill: "#41BDFF",
			  backgroundColor: "#4E4E4E"
		};

		return <ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} style={styles}/>;

	}

	componentDidMount() {

	}
}
