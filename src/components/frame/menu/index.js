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

		this.state.open = false;
	}

	// menuOpen() {
	// 	this.setState({open : true});
	// }

	// menuClose() {
	// 	this.setState({open : false});
	// }
    
	render() {
		return (
            <div>
							<Title text = {this.props.name}/>
								{/* <Button onClick = { this.menuOpen() }/> */}
								{/* { this.state.open ? <div class = { style.menu }>
									<Button onClick = { this.props.changeLocation("newquay") } text = "Newquay"/>
									<Button onClick = { this.props.changeLocation("thurso") } text = "Thurso"/>
									{perhaps use this: https://github.com/negomi/react-burger-menu}
								</div> : null} */}
						</div>
		);
	}
}