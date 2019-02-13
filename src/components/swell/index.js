// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import swellBoxes from '../swellBoxes';
import swellGraph from '../swellGraph';

export default class swell extends Component {

	constructor(props){
		super(props);

        // this.props.swell = {
        // 		"primary" : {
        // 			"direction" : [],
        // 			"height" : [],
        // 			"period" : []
        // 		},
        // 		"secondary" : {
        // 			"direction" : [],
        // 			"height" : [],
        // 			"period" : []
        // 		}
        // 	}
    
	}
    
	render() {
		<div class={ style.swell }>
            <swellBoxes swell = { this.props.swell } />
            <swellGraph swell = { this.excludeDirection() } />
        </div>;
	}
    
	excludeDirection() {
		let copy = JSON.parse(JSON.stringify(this.props.swell));
		delete copy.primary.direction;
		delete copy.secondary.direction;
		return copy;
	}
}