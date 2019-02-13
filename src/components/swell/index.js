// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import SwellBoxes from '../swellBoxes';
import SwellGraph from '../swellGraph';

export default class Swell extends Component {

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
        return (
            <div class={ style.swell }>
                <p>SWELL</p>
                <SwellBoxes swell = { this.props.swell } />
                <SwellGraph swell = { this.props.swell } />
            </div>
        );
	}
}