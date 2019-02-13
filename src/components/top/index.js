// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import { isBoolean } from 'util';

export default class Top extends Component {

	constructor(props){
		super(props);
        
        //e.g. 
        // this.props.location = {
        // 		"name" : "Newquay",
		//      "tide" : "0546",
	    //      "weather" : "1"
        // 	}
    
	}
    
	render() {
        return (
            <div>
                <p>TOP</p>
            </div>
        );
	}
}