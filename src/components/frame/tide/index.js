// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';
import ChartistGraph from 'react-chartist';

export default class Tide extends Component {

	constructor(props){
		super(props);
	}

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
			  backgroundColor: "#4E4E4E",
			  padding: 0,
			  height: 
		};

		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
				<ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} style={styles}/>
            </div>
		);
	}

}
