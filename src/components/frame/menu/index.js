// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';
import Button from '../button';

export default class Menu extends Component {

	constructor(props){
		super(props);

		this.menuClose = this.menuClose.bind(this)
		this.state.open = false;
	}

	menuOpen() {
		this.setState({open : true});
	}

	menuClose() {
		this.setState({open : false});
	}

	changeLocation(value) {
		this.props.setLocation(value)
		this.menuClose()
	}

	render() {
		return (
            <div class = { style.menu }>
							<Title text = {this.props.name}/>
							<div class = { style.dropButton }>
							<Button clickFunction = { this.menuOpen.bind(this) } text="Change"/></div>
							{ this.state.open ? <div class = { style.dropdown }>
									<Button clickFunction = { this.changeLocation.bind(this, "newquay") } text = "Newquay"/>
									<Button clickFunction = { this.changeLocation.bind(this, "thurso") } text = "Thurso"/>
								</div> : null}
						</div>
		);
	}
}
