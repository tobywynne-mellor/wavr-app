// import preact
import { h, render, Component } from 'preact';
// import style sheet
import style from './style';

export default class Loading extends Component {

	constructor(props){
		super(props);
	}


	render() {
		return (
				<div class={ style.loader }>
					<div class={style.loader__background}>
						<div class={style.loader__inner}></div>
					</div>
					<div class={style.loaderText}>wavr</div>
				</div>
		);
	}
}
