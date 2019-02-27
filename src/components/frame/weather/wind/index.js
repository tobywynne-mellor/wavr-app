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
								<ellipse ry="80" rx="80" id="backCircle" cy="100" cx="100" stroke-width="3" stroke="#ffffff" fill="#000"/>
                <path class="bg" transform="translate (0,-13)" d="m40.32092,163.95455a79.14646,78.68765 0 1 1 121.21743,0" fill="none" id="grey" stroke="#bfbfbf" stroke-width="11"/>
                <path class="meter" transform="translate (0,-13)" d="m40.32092,163.7304a79.14646,78.68765 0 1 1 121.21743,0" fill="none" id="blue" stroke="#007fff" stroke-dasharray="360" stroke-dashoffset={this.speed2Angle(this.props.speed)} stroke-width="11"/>
                <text class="foreground" fill="#ffffff" font-family="Sans-serif" font-size="32" id="directionText" stroke="#ff0000" stroke-width="0" text-anchor="middle" x="100" y="105">{ this.props.compass }</text>
                <text class="foreground" fill="#ffffff" font-family="Sans-serif" font-size="18" id="speedText" stroke="#ff0000" stroke-width="0" text-anchor="middle"  x="100" y="130">{ this.props.speed } mph</text>
								<path transform={this.rotatePointer()} d="M100,180 L110,150 L90,150 z" fill="#ff0000" />
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

	rotatePointer(){
		var direction = this.props.direction;
		return 'rotate('+ direction +',100,100)';
	}
}
