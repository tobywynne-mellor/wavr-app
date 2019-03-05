// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import sun from './1.png';

export default class Conditions extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
            <div>
                <p>temp: { this.props.temperature }</p>
                <p>chill: { this.props.chill }</p>

                <img>src={sun}</img>
            </div>
		);
	}

	iconString(){
		var reference = this.props.newIconNo;
		return "./../../../assets/weatherIcons/" + reference + ".png";
	}
}
