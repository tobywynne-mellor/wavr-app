// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';

export default class Tide extends Component {

	constructor(props){
		super(props);
		this.state.coverWidth = 0;
	}

	calcCoverPaneWidth(time) {
		this.setState({coverWidth : (this.roundDown(time.getHours(),3)/24) * 330});
	}

	//rounds a number down to the nearest multiple
	roundDown (n, m) {
		return n >= 0 ? (n / m) * m : ((n - m + 1) / m) * m;
	}

	//returns the index where data can before for current day and time
	// calcIndex(time, day) {
	// 	return Math.round(day*12 + (time/3));
	// }

	componentDidMount() {
		this.calcCoverPaneWidth(new Date());
	}

	render() {
		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
				<svg class={style.svg} viewBox="0 0 350 90">
					<rect class={style.backdrop} x="10" y="20" width="330" height="50"></rect>
					<path class={style.wave} d="M 10.003 69.929 C 48.007 69.079 54.148 20.228 91.889 20.529 C 131.661 20.846 128.99 67.28 182.341 67.825 C 222.867 68.239 234.317 20.621 269.594 21.165 C 302.052 21.666 313.624 64.315 340.109 70.094"></path>
					<text class={style.text} x="10" y="80.302">{}</text>
					<text class={style.text} x="78.153" y="17.302">{}</text>
					<text class={style.text} x="170" y="80.302">{}</text>
					<text class={style.text} x="260" y="17.302">{}</text>
					<text class={style.text} x="315" y="80.302">{}</text>
					<rect class={style.coverPane} x="10" y="20" width={this.state.coverWidth} height="50"></rect>
					<line class={style.timeBar} x1={this.state.coverWidth+10} y1="18" x2={this.state.coverWidth+10} y2="72"></line>
				</svg>
            </div>
		);
	}




}
