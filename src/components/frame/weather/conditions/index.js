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
				<div class={style.tempBox}>
					<img src='./../../../assets/weatherIcons/thermometer.png' class={style.smallImage}></img>
					<div class={style.tempText}>{ this.props.temperature } °C</div>
				</div>
				<div class={style.chillBox}>
					<svg class={style.snowflake} x="0px" y="0px" width="30" height="30" viewBox="0 0 700.236 700.236">
						<path class={style.snowflakepath} d="M645.527,495.815l-75.609-43.689l63.832-38.015c10.262-4.944,13.438-18.724,7.602-28.855
						c-5.941-10.375-18.764-12.563-28.498-6.89l-85.107,49.849L392.488,349.51l135.258-77.894l85.107,49.768
						c2.658,1.945,6.078,3.08,9.881,3.08c7.213,0,13.674-3.404,18.617-9.889c5.699-10.294,2.66-23.911-7.602-28.855l-63.832-38.015
						l75.609-43.688c9.855-5.674,13.244-18.4,7.602-28.856c-5.389-10.051-18.723-13.536-28.879-7.619l-75.99,44.094l-1.135-76.03
						c-0.178-11.753-9.119-21.237-20.896-21.237c-11.775,0-20.984,10.213-20.895,21.237l0.754,100.346l-134.496,77.894V155.788
						l84.727-48.309c9.891-5.593,14.201-18.643,8.357-28.855c-5.934-10.375-18.115-13.456-28.498-7.619l-64.586,36.475V21.236
						c0-11.753-9.5-21.236-21.277-21.236c-11.777,0-20.896,9.483-20.896,21.236v87.053l-66.871-37.285
						c-10.416-5.755-22.274-2.513-28.118,7.619c-5.933,10.375-2.245,23.101,7.976,28.855l87.013,49.039v156.518l-137.542-79.353
						l0.762-98.077c1.143-11.023-8.738-21.237-20.515-21.237h-0.762c-11.016,0-20.774,9.484-20.896,21.237l-0.762,73.76l-74.084-42.554
						c-10.343-5.998-23.109-2.432-28.499,7.538c-5.642,10.537-2.724,22.939,7.603,28.937l74.846,43.283l-65.354,39.15
						C53.96,290.664,50.758,304.443,57,314.575c4.02,6.566,9.873,9.889,17.856,9.889c4.174,0,7.651-1.054,11.015-3.08l85.489-50.498
						l137.162,78.624l-137.162,79.434l-85.489-50.578c-10.262-5.998-23.49-3.161-28.872,6.89c-5.642,10.456-2.578,23.02,7.214,28.855
						l65.355,38.744l-74.847,43.689c-10.302,5.998-13.642,18.643-7.603,28.937C51.342,532.614,57,536.1,64.976,536.1
						c1.897,0,5.698-1.135,10.643-3.08l74.084-42.554l0.762,73.76c0.122,11.753,9.88,20.831,20.896,20.831h0.762
						c11.777,0,20.604-9.808,20.515-21.642l-0.762-97.996l137.542-78.623v155.707l-87.013,49.038
						c-10.383,5.836-14.015,18.562-7.976,28.856c4.223,7.214,9.881,10.699,17.856,10.699c3.802,0,7.303-0.648,10.262-2.351
						l66.871-37.935v88.513c0,11.753,9.119,20.912,20.896,20.912c11.777,0,21.277-9.159,21.277-20.912v-87.054l64.586,36.476
						c2.957,1.702,6.459,2.351,9.881,2.351c8.355,0,14.516-3.404,18.617-10.699c5.771-10.213,2.043-23.021-8.357-28.856l-84.727-47.498
						V385.985l134.496,77.894l-0.754,99.536c-0.098,11.834,9.119,21.642,20.896,21.642s20.717-9.078,20.895-20.831l1.135-76.435
						l75.99,44.499c2.934,1.702,6.84,2.27,11.023,2.27c7.977,0,13.828-3.323,17.855-9.889
						C659.363,514.539,655.382,501.489,645.527,495.815z"/>
					</svg>
					<div class={style.tempText}>{ this.props.chill } °C</div>
				</div>
				<svg class={style.dial} viewBox='0 0 200 200'>
					<ellipse class={style.backCircle} ry="80" rx="80" cy="100" cx="100" stroke-width="3" stroke="#ffffff" fill="#000" />
					<path class={style.bg} transform="translate (0,-13)" d="m40.32092,163.95455a79.14646,78.68765 0 1 1 121.21743,0" fill="none" stroke-width="11" />
					<path class={style.meter} transform="translate (0,-13)" d="m40.32092,163.7304a79.14646,78.68765 0 1 1 121.21743,0" fill="none" id="blue" stroke-dasharray="360" stroke-dashoffset={this.speed2Angle(this.props.speed)} stroke-width="11" />
					<text class={style.dirText} font-family="Sans-serif" font-size="32" id="directionText" stroke="#ff0000" stroke-width="0" text-anchor="middle" x="100" y="105">{this.props.compass}</text>
					<text class={style.speedText} font-family="Sans-serif" font-size="18" id="speedText" stroke="#ff0000" stroke-width="0" text-anchor="middle" x="100" y="130">{this.props.speed} mph</text>
					<path class={style.pointer} transform={this.rotatePointer()} d="M100,180 L110,150 L90,150 z" />
				</svg>
				<div class={style.windText}>{this.windText()}</div>
				<img src={this.iconString()} class={style.image}></img>
			</div>
		);
	}

	windText(){
		//wind description text
		//direction text
		let direction;
		//thurso and newquay off-shore wind is south-east
		if (this.props.compass == 'SE'||this.props.compass == 'SES'||this.props.compass == 'SSE'||this.props.compass == 'SEE'||this.props.compass == 'ESE'||this.props.compass == 'S'||this.props.compass == 'E'){
			direction = 'off-shore';
		}
		else if (this.props.compass == 'NW'||this.props.compass == 'NNW'||this.props.compass == 'NWW'||this.props.compass == 'NWN'||this.props.compass == 'WNW'||this.props.compass == 'N'||this.props.compass == 'E'){

			direction = 'on-shore';
		}
		else {
			direction = 'cross';
		}

		//strength text
		let strength;
		if (this.props.speed < 4){
			strength = 'weak';
		}
		else if (this.props.speed >= 4 && this.props.speed <= 20){
			strength = 'medium';
		}
		else {
			strength = 'strong';
		}

		//return string
		return '' + strength + ' ' + direction + ' wind';
	}

	iconString(){
		//returns a string that gives the path of the icon file that is selected
		let reference = this.props.newIconNo;
		return "./../../../assets/weatherIcons/" + reference + ".png";
	}

	speed2Angle(speed) {
		//returns a value which is used to draw the wind speed guage, based on the wind speed
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
		//rotates the pointer of the compass to show the direction of the wind
		let direction = this.props.direction;
		return 'rotate(' + direction + ',100,100)';
	}
}
