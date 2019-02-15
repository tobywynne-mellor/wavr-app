// import preact
import { h, render, Component } from 'preact';
import style from './style';
import { isBoolean } from 'util';
import Stars from '../stars';

export default class Slider extends Component {

	constructor(props){
		super(props);
	}

	//call this.props.changeTime(hour), hour: 0-23
    
	render() {
		return (
            <div>
                <p>Slider</p>
				<Stars stars = {this.props.rating[0]} />
            </div>
		);
	}
}