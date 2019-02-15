// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class Stars extends Component {

	constructor(props){
		super(props);
	}

	//call this.props.changeTime(hour), hour: 0-23
    
	render() {

		let s = "";
		for (let i = 0; i < this.props.stars; i++){
			s = s + " star";
		}

		return (
            <div>{s}</div>
		);
	}
}