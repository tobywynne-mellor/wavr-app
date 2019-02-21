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
                <p>Conditions</p>
                <p>temp: { this.props.temperature }</p>
                <p>chill: { this.props.chill }</p>
                <p>icon: { this.props.iconNo }</p>
            </div>
		);
	}
}