// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class Wind extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div class={style.grid}>
			<img src='./../../../assets/weatherIcons/thermometer.png' class={style.smallImage}></img><p>{ this.props.temperature } °C</p>
				<svg class={style.dial} viewBox='0 0 200 200'>
					<ellipse class={style.backCircle} ry="80" rx="80" cy="100" cx="100" stroke-width="3" stroke="#ffffff" fill="#000" />
					<path class={style.bg} transform="translate (0,-13)" d="m40.32092,163.95455a79.14646,78.68765 0 1 1 121.21743,0" fill="none" stroke-width="11" />
					<path class={style.meter} transform="translate (0,-13)" d="m40.32092,163.7304a79.14646,78.68765 0 1 1 121.21743,0" fill="none" id="blue" stroke-dasharray="360" stroke-dashoffset={this.speed2Angle(this.props.speed)} stroke-width="11" />
					<text class={style.dirText} font-family="Sans-serif" font-size="32" id="directionText" stroke="#ff0000" stroke-width="0" text-anchor="middle" x="100" y="105">{this.props.compass}</text>
					<text class={style.speedText} font-family="Sans-serif" font-size="18" id="speedText" stroke="#ff0000" stroke-width="0" text-anchor="middle" x="100" y="130">{this.props.speed} mph</text>
					<path class={style.pointer} transform={this.rotatePointer()} d="M100,180 L110,150 L90,150 z" />
				</svg>
				<img src={this.iconString()} class={style.image}> </img>
				<img src='./../../../assets/weatherIcons/chill.png' class={style.smallImage}></img> <p>{ this.props.chill } °C</p>
			</div>
		);
	}

	iconString(){
		var reference = this.props.newIconNo;
		return "./../../../assets/weatherIcons/" + reference + ".png";
	}

	speed2Angle(speed) {
		let angle;
		if (speed <= 2) {
			return 360;
		}
		else if (speed >= 40) {
			return 0;
		}

		return (1 - (speed / 40)) * 360;

	}

	rotatePointer() {
		let direction = this.props.direction;
		return 'rotate(' + direction + ',100,100)';
	}
}
