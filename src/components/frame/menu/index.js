// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Title from '../title';
import Button from '../button';
import Stars from '../stars';

export default class Menu extends Component {

	constructor(props) {
		super(props);

		this.menuClose = this.menuClose.bind(this)
		this.state.open = false;
	}

	menuOpen() {
		this.setState({ open: true });
	}

	menuClose() {
		this.setState({ open: false });
	}

	changeLocation(value) {
		this.props.setLocation(value);
		this.menuClose();
	}

	render() {
		return (
			<div class={style.menu}>
				<div class= {style.infoLayout}>
					<div class = {style.locName}>{this.props.name.toUpperCase()}</div>
					<div>
						<div class = {style.day}>{this.props.day.toUpperCase().substring(0,3)}</div>
						<div class = {style.time}>{this.props.time}</div>
					</div>
					<div class = {style.stars}>
						<Stars stars = {this.props.rating} class = {style.stars}/>
					</div>
				</div>
				{this.state.open ?
					<div class={style.dropdown}>
						<Button clickFunction={this.changeLocation.bind(this, "newquay")} text="NEWQUAY" />
						<Button clickFunction={this.changeLocation.bind(this, "thurso")} text="THURSO" />
					</div>
					: (<button class={style.button} onClick={this.menuOpen.bind(this)}>
							<svg width="24" height="24" viewBox="0 0 24 24" >
								<path class={style.icon} d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
							</svg>
						</button>
					)
				}
			</div>
		);
	}
}
