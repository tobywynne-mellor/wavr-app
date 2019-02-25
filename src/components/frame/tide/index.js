// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';

export default class Tide extends Component {

	constructor(props){
		super(props);
	}

	render() {
		return (
            <div class = { style.tide }>
                <Title text="Tide"/>
            </div>
		);
	}




}
