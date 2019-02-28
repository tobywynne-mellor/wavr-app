/* eslint-disable indent */
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';

export default class Tide extends Component {

	constructor(props){
    super(props);
    this.constructPoints.bind(this);
    this.svgPath.bind(this);
    this.lineCommand.bind(this);
    this.line.bind(this);
    this.controlPoint.bind(this);
    this.bezierCommand.bind(this);
	}

	render() {
		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
				<svg class={style.svg} viewBox="0 0 350 90">
					<rect class={style.backdrop} filter="url(#inset)" x="10" y="20" width="330" height="50"></rect>
          <path class={style.wave} d={this.getWave()}></path>
					{/* {this.props.xPoints.length > 0 ? <path class={style.wave} d={this.svgPath(this.constructPoints(),this.bezierCommand)}></path> :null} */}
					<text class={style.text} x="10" y="80.302">{"00:00"}</text>
					<text class={style.text} x={ this.props.xPoints[0]-12 } y="17.302">{ this.props.times[0] }</text>
					<text class={style.text} x={ this.props.xPoints[1]-12 } y="80.302">{ this.props.times[1] }</text>
					<text class={style.text} x={ this.props.xPoints[2]-10 } y="17.302">{ this.props.times[2] }</text>
					{this.props.xPoints.length > 3 ? <text class={style.text} x={ this.props.xPoints[3]-10 } y="80.302">{ this.props.times[3] }</text> : null}
					<rect class={style.coverPane} x="10" y="20" width={this.props.time !== "undefined" ? this.props.time/24 * 330 : 0} height="50"></rect>
					<line class={style.timeBar} x1={this.props.time !== "undefined" ? (this.props.time/24 * 330) + 10 : 0} y1="18" x2={this.props.time !== "undefined" ? (this.props.time/24 * 330) + 10 : 0} y2="72"></line>
				</svg>
            </div>
		);
  }
  
	// "M10.003,69.929 C48.007,69.079 54.148,20.228 91.889,20.529 C131.661,20.846 128.99,67.28 182.341,67.825 C222.867,68.239 234.317,20.621 269.594,21.165 C302.052,21.666 313.624,64.315 340.109,70.094"
	getWave() {
		let y = {
			top : 21,
			bottom : 70
		};

		let d = "M10," + y.bottom;

		for (let i = 0; i<this.props.xPoints.length; i++){
			d += " L" + this.props.xPoints[i] + "," + (i%2 === 0 ? y.top : y.bottom);
		}

		d += " L340,"+y.bottom+" L10," + y.bottom + "Z";

		return d;
	}
  
	constructPoints(){
    let arr = [];
    
    let y = {
			top : 21,
			bottom : 70
		};

		let xs = this.props.xPoints;
		for (let i = 0; i < xs.length; i++) {
      arr.push([xs[i],(i%2 === 0 ? y.top : y.bottom)]);
    }
    return arr;
	}
  
	svgPath(points, command){
    // build the d attributes by looping over the points
		const d = points.reduce((acc, point, i, a) => i === 0
      // if first point
      ? `M ${point[0]},${point[1]}`
      // else
      : `${acc} ${command(point, i, a)}`
    , '');
		return `<path d="${d}" fill="none" stroke="grey" />`;
  }
  
  lineCommand(point){
    `L ${point[0]} ${point[1]}`;
  }

	line(pointA, pointB){

		const lengthX = pointB[0] - pointA[0];
		const lengthY = pointB[1] - pointA[1];

		return {
			length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
			angle: Math.atan2(lengthY, lengthX)
		};
	}

	controlPoint(current, previous, next, reverse){
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
		const p = previous || current;
		const n = next || current;
			// The smoothing ratio
		const smoothing = 0.2;
			// Properties of the opposed-line
		const o = this.line(p, n);
			// If is end-control-point, add PI to the angle to go backward
		const angle = o.angle + (reverse ? Math.PI : 0);
		const length = o.length * smoothing;
			// The control point position is relative to the current point
		const x = current[0] + Math.cos(angle) * length;
		const y = current[1] + Math.sin(angle) * length;
		return [x, y];
	}
  
	bezierCommand(point, i, a){
    // start control point
		const [cpsX, cpsY] = this.controlPoint(a[i - 1], a[i - 2], point);
    // end control point
		const [cpeX, cpeY] = this.controlPoint(point, a[i - 1], a[i + 1], true);
		return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
	}

}
