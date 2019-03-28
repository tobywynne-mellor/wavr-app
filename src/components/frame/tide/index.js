/* eslint-disable indent */
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';

export default class Tide extends Component {

	constructor(props) {
		super(props);
		this.constructPoints = this.constructPoints.bind(this);
		this.svgBuild = this.svgBuild.bind(this);
		this.lineCommand = this.lineCommand.bind(this);
		this.line = this.line.bind(this);
		this.controlPoint = this.controlPoint.bind(this);
		this.bezierCommand = this.bezierCommand.bind(this);
		this.adjustPosition = this.adjustPosition.bind(this);
	}

	render() {
		return (
			<div class={style.tide}>
				<Title text="Tide" tooltip="Alternate rising and falling of the sea." />
				{/* {Make sure props have loaded} */}
				{this.props.points.length !== 0 ? (
					<svg class={style.svg} viewBox="0 0 350 90">
						<rect class={style.backdrop} x="0" y="20" width="350" height="50"></rect>
						<path class={style.wave} d={this.svgBuild(this.constructPoints(this.props.points), this.bezierCommand)}></path>
						<text class={style.text} x={this.props.points[0][0] - 12} y={this.adjustPosition(this.props.points[0][1])}>{this.props.times.time[0]}</text>
						<text class={style.text} x={this.props.points[1][0] - 12} y={this.adjustPosition(this.props.points[1][1])}>{this.props.times.time[1]}</text>
						<text class={style.text} x={this.props.points[2][0] - 10} y={this.adjustPosition(this.props.points[2][1])}>{this.props.times.time[2]}</text>
						{this.props.points.length > 3 ? <text class={style.text} x={this.props.points[3][0] - 20} y={this.adjustPosition(this.props.points[3][1])}>{this.props.times.time[3]}</text> : null}
						<rect class={style.coverPane} x="0" y="20" width={this.props.time / 24 * 350} height="50"></rect>
						<rect class={style.coverPane} x={(this.props.time / 24 * 350) + 43} y="20" width={350 - (this.props.time / 24 * 350)} height="50"></rect>
						<line class={style.timeBar} x1={(this.props.time / 24 * 350) + 1} y1="18" x2={(this.props.time / 24 * 350) + 1} y2="72"></line>
						<line class={style.timeBar} x1={(this.props.time / 24 * 350) + 43} y1="18" x2={(this.props.time / 24 * 350) + 43} y2="72"></line>
					</svg>
				) : (
						// if props dont load show box with loading...
						<svg class={style.svg} viewBox="0 0 350 90">
							<rect class={style.backdrop} x="0" y="20" width="350" height="50"></rect>
							<text class={style.loadingText} x="136" y="45">Loading...</text>
						</svg>
					)}

			</div>
		);
	}

	// this is used to dynamically position the time labels either at the top
	// or bottom of the tide graph svg according to the position of the "wave" point
	adjustPosition(y) {
		if (y < 50) {
			y = y - 4;
		} else {
			y = y + 10;
		}
		return y;
	}

	// ensures the "wave" is smooth at the beginning and end
	// by adding points to the bezier curve.
	// this gives the illusion that the curve is continuous even though
	// the component only has 3/4 data points
	constructPoints(points) {

		let arr = [];

		for (let i = 0; i < points.length; i++) {
			arr.push(points[i]);
		}

		if (arr[0][1] < 50) {
			// add 1 low point before if high
			arr.unshift([arr[0][0] - (arr[1][0] - arr[0][0]), 70]);
		} else {
			// add 2 point before if low
			arr.unshift([arr[0][0] - arr[0][0] - arr[1][0], 21]);
			arr.unshift([arr[0][0] - arr[0][0] - arr[1][0], 70]);
		}

		if (arr[arr.length - 1][1] > 50) {
			// add 2 points after if end on low
			arr.push([arr[arr.length - 1][0] + arr[arr.length - 1][0] - arr[arr.length - 2][0], 21]);
			arr.push([arr[arr.length - 1][0] + arr[arr.length - 1][0] - arr[arr.length - 2][0], 70]);
		} else {
			// add 1 low point after if end on high
			arr.push([arr[arr.length - 1][0] + arr[arr.length - 1][0] - arr[arr.length - 2][0], 70]);
			arr.push([arr[arr.length - 1][0] + arr[arr.length - 1][0] - arr[arr.length - 2][0], 21]);
			arr.push([arr[arr.length - 1][0] + arr[arr.length - 1][0] - arr[arr.length - 2][0], 70]);
		}
		return arr;
	}

	//Build the svg wave
	svgBuild(points, command) {
		const d = points.reduce((acc, point, i, a) => i === 0
			// if first point
			? `M ${point[0]},${point[1]}`
			// else
			: `${acc} ${command(point, i, a)}`
			, '');
		return `${d}`;
	}

	// utility function to build svg lines
	lineCommand(point) {
		`L ${point[0]} ${point[1]}`;
	}

	// utility function to give angle and length of lines
	line(pointA, pointB) {

		const lengthX = pointB[0] - pointA[0];
		const lengthY = pointB[1] - pointA[1];

		return {
			length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
			angle: Math.atan2(lengthY, lengthX)
		};
	}

	controlPoint(current, previous, next, reverse) {
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

	bezierCommand(point, i, a) {
		// start control point
		const [cpsX, cpsY] = this.controlPoint(a[i - 1], a[i - 2], point);
		// end control point
		const [cpeX, cpeY] = this.controlPoint(point, a[i - 1], a[i + 1], true);
		return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
	}
}
