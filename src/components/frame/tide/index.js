// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';

export default class Tide extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
				<svg class={style.svg} viewBox="0 0 350 90">
					<rect class={style.backdrop} filter="url(#inset)" x="10" y="20" width="330" height="50"></rect>
					<path class={style.wave} d="M 10.003 69.929 C 48.007 69.079 54.148 20.228 91.889 20.529 C 131.661 20.846 128.99 67.28 182.341 67.825 C 222.867 68.239 234.317 20.621 269.594 21.165 C 302.052 21.666 313.624 64.315 340.109 70.094"></path>
					<text class={style.text} x="10" y="80.302">{"00:00"}</text>
					<text class={style.text} x={ this.props.xPoints[0] } y="17.302">{ this.props.times[0] }</text>
					<text class={style.text} x={ this.props.xPoints[1] } y="80.302">{ this.props.times[1] }</text>
					<text class={style.text} x={ this.props.xPoints[2] } y="17.302">{ this.props.times[2] }</text>
					<text class={style.text} x={ this.props.xPoints[3] } y="80.302">{ this.props.times[3] }</text>
					<rect class={style.coverPane} x="10" y="20" width={this.props.time !== "undefined" ? this.props.time/24 * 330 : 0} height="50"></rect>
					<line class={style.timeBar} x1={this.props.time !== "undefined" ? (this.props.time/24 * 330) + 10 : 0} y1="18" x2={this.props.time !== "undefined" ? (this.props.time/24 * 330) + 10 : 0} y2="72"></line>
				</svg>
            </div>
		);
	}
}
