// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class Wind extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
            <div>
                <svg class={style.dial} viewBox='0 0 200 200'>
                  <ellipse class="background" cx="100.83334" cy="113.16667" fill="#000000" id="circle" rx="79.16666" ry="79.16666" stroke="#ffffff" stroke-width="3"/>
                  <path class="background" d="m89.35071,68.95138l11.17376,-22.37807l11.17376,22.37807l-22.34753,0l0.00001,0l-0.00001,0l0.00001,0z" fill="#ff0000" id="pointer" stroke="#ff0000" stroke-width="5"/>
                  <path class="bg" d="m40.32092,163.95455a79.14646,78.68765 0 1 1 121.21743,0" fill="none" id="grey" stroke="#bfbfbf" stroke-width="11"/>
                  <path class="meter" d="m40.32092,163.7304a79.14646,78.68765 0 1 1 121.21743,0" fill="none" id="blue" stroke="#007fff" stroke-dasharray="360" stroke-dashoffset={this.speed2Angle(this.props.speed)} stroke-width="11"/>
                  <text class="foreground" fill="#ffffff" font-family="Sans-serif" font-size="24" id="directionText" stroke="#ff0000" stroke-width="0" text-anchor="middle" transform="matrix(1.85954 0 0 1.85954 -298.523 -166.685)" x="214.52323" y="153.57374">{ this.props.compass }</text>
                  <text class="foreground" fill="#ffffff" font-family="Sans-serif" font-size="24" id="speedText" stroke="#ff0000" stroke-width="0" text-anchor="middle" transform="matrix(0.711743 0 0 0.711743 8.86236 47.6706)" x="129.21407" y="127.23824">{ this.props.speed } mph</text>
                </svg>
            </div>
		);
	}

	speed2Angle(speed){
		var angle;
		if(speed<=2){
			return 360;
		}
		else if(speed>=20){
			return 0;
		}
		else{
			return (1-(speed/20))*360;
		}
	}
}
