// import preact
import { h, render, Component } from 'preact';
// import style sheet
import style from './style';
import reload from '../../assets/refresh.png'
import parent from '../app'

export default class Error extends Component {

	constructor(props){
		super(props);
	}



	render() {
		return (
				<div class={ style.loader }>
					<div class= { style.message }>Weather data failed to load.<br/>Please try again later.
						<div class= {style.reload }>
							<img src={reload}/>
						</div>
					</div>
				</div>
		);
	}
}
