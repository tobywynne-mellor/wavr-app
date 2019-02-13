// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';
import Conditions from  '../conditions';
import Wind from  '../wind';

export default class Weather extends Component {

	constructor(props){
		super(props);
        
        //e.g. 
        // this.props.weather = {
        // 		"temperature" : [],
		//      "chill" : [],
		//      "iconNo" : [],
		//      "windSpeed" : [],
		//      "windDirection" : []
        // 	}
    
	}
    
	render() {
        return (
            <div>
                <p>WEATHER</p>
                <Conditions/>
                <Wind/>
            </div>
        );
	}
}