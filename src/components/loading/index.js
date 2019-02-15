// import preact
import { h, render, Component } from 'preact';
// import style sheet
import style from './style';
import { isBoolean } from 'util';

export default class Loading extends Component {

	constructor(props){
		super(props);
	}
    
	render() {
		return <div><h3>Loading...</h3></div>;
	}
}