// import preact
import { h, render, Component } from 'preact';

export default class Button extends Component {

	constructor(props) {
		super(props);
	}
	// rendering a function when the button is clicked
	render() {
		return (
			<div>
				<button onClick = {this.props.clickFunction} >
					{ this.props.text }
				</button>
			</div>
		);
	}
}
