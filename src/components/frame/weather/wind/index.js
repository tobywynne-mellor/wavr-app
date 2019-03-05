// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class Conditions extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
            <div>
            </div>
		);
	}

	iconString(){
		var reference = this.props.newIconNo;
		return "./../../../assets/weatherIcons/" + reference + ".png";
	}
}
