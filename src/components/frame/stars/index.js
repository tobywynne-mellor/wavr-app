// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default class Stars extends Component {

	constructor(props){
		super(props);
	}

	render() {
		library.add(faStar);
		return (
			<div class = {style.stars}>
				{ Array(this.props.stars).fill(<FontAwesomeIcon icon={faStar} />)}
				{ !isNaN(5-this.props.stars) ? Array(5-this.props.stars).fill(<FontAwesomeIcon icon={faStar} style={{opacity : 0.5}}/>) : null}
			</div>
		);
	}
}