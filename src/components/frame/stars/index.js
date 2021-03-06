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
			// This will return non transparent stars corrosponding to the data from props
			// following the non transparent stars the half transparent stars will follow
			<div class = {style.stars}>
				{ Array(this.props.stars).fill(<FontAwesomeIcon icon={faStar} style={{width: "15px"}}/>)}
				{ !isNaN(5-this.props.stars) ? Array(5-this.props.stars).fill(<FontAwesomeIcon icon={faStar} style={{opacity : 0.5, width: "15px"}}/>) : null}
			</div>
		);
	}
}