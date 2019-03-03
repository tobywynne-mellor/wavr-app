// import preact
import { h, render, Component } from 'preact';
// import style sheet
import style from './style';
import { isBoolean } from 'util';
import Loader from './loader';

export default class Loading extends Component {

	constructor(props){
		super(props);
		this.state.height = 1;
		this.state.freq = 6;
		this.state.up = true;
		this.createWave.bind(this);
		this.repeatOften.bind(this);
		this.state.path = this.createWave(1,6);

	}
    
	render() {
		(function() {
			let lastTime = 0;
			let vendors = ['ms', 'moz', 'webkit', 'o'];
			for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
				window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
										|| window[vendors[x]+'CancelRequestAnimationFrame'];
			}
		
			if (!window.requestAnimationFrame)
				window.requestAnimationFrame = function(callback, element) {
					let currTime = new Date().getTime();
					let timeToCall = Math.max(0, 16 - (currTime - lastTime));
					let id = window.setTimeout(() => { callback(currTime + timeToCall); },
					timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
		
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = function(id) {
					clearTimeout(id);
				};
		}());

		return (
		<div>
			<Loader height = {this.state.height} width={this.state.width}></Loader>
		</div>);
	}

	componentDidMount() {
		requestAnimationFrame(this.repeatOften);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state){
			this.setState({path : this.createWave(this.state.height, this.state.freq)});
		}
	}

	createWave(HEIGHT, FREQUENCY) {
		let xs = [];
		
		for (let i = 0; i <= 250; i++) {
			xs.push(i);
		}
		
		let points = xs.map( x => {
			
			let y = (12-HEIGHT)*18 + 30 * Math.sin(x/((11-FREQUENCY)*10));
			
			return [x, y];
		});
		
		let path = "M" + points.map( p => {
			return p[0] + "," + p[1];
		}).join(" L");
		
		path += " L250,500 L0,500Z";
		
		return path;
	}

	repeatOften() {
		if (this !== null ) {
			if (this.state.up && this.state.height < 10) {
				this.setState({height : this.state.height + 0.1, freq : this.state.freq + 0.01});
			} else if (this.state.up && this.state.height > 10){
				this.setState({height : this.state.height - 0.1, freq : this.state.freq - 0.01, up: false});
			} else if (!this.state.up && this.state.height > 0){
				this.setState({height : this.state.height - 0.1, freq : this.state.freq - 0.01});
			} else if (!this.state.up && this.state.height < 0){
				this.setState({height : this.state.height + 0.1, freq : this.state.freq + 0.01, up: true});
			}
			this.setState({path : this.createWave(this.state.height, this.state.freq)});
			requestAnimationFrame(this.repeatOften);
		}
	}
}