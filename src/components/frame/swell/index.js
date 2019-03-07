// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import SwellBoxes from './swellBoxes';
import SwellGraph from './swellGraph';
import Title from '../title';

export default class Swell extends Component {

	constructor(props){
		super(props);
		this.onHover = this.onHover.bind(this);
		this.state = { hoverCheck : false };
	}

	// changes the state of the hoverCheck state attribute 
	onHover(isHover) {
		this.setState({ hoverCheck : isHover });
	}

	render() {
		return (
      <div class = { style.swell }>
				<Title text = "Swell"/>
				<SwellBoxes swell = { this.props.swell} index = {this.props.index} onHover={this.onHover}/>
				<SwellGraph swell = { this.props.swell} index = {this.props.index} secondaryShowing={this.state.hoverCheck}/>
      </div>
		);
	}
}
