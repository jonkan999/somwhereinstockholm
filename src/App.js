
import React from 'react';
import distance from 'turf';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import { MapNodes } from './MapNodes.js';
import Street from './Street';
import cross from './icons/cross.png';
import turf from 'turf';
import CountdownTimer from './Components/CountdownTimer/CountdownTimer'



	
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ua2FueDMiLCJhIjoiY2t6a2NpamRlMHBnNzJwa2VwMXZienQxZSJ9.8Or2IqnhqXW72AMn6PndLg';

const defaultStart= [18.036,59.316] 
const timeAvailable = 30



export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      lng: defaultStart[0],
      lat: defaultStart[1],
      zoom: 10,
	  activeCSS: 'default',
	  iframeURL: this.props.dataFromParent,
	  hnetURL: '',
	  realtorURL: '',
	  spriteLng: defaultStart[0],
	  spriteLat: defaultStart[1],
	  spriteBearing: 1,
	  hnetHeader: '',
	  hnetBody1: '',
	  hnetBody2: '',
	  hnetBody3: '',
	  PopupHeader: '',
	  PopupContent: '',
	  showScore: false,
	  score: 0
	  
	  
	  
    };
    this.mapContainer = React.createRef();
  }
  

  

  

	
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    this.map = new mapboxgl.Map({
      container: this.mapContainer.current,
      //style: 'mapbox://styles/jonkanx3/ckzkcsi4t002w15sekpsbw7xt',
	  style: 'mapbox://styles/jonkanx3/cl083pslf002714qdhi3qle09',
      center: [lng, lat],
      zoom: zoom,
	  antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
    });
	
	this.map.getCanvas().style.cursor = 'pointer';
	
	setTimeout(
		() => this.setState({ showScore: true }), 
		timeAvailable*1000
	  );

	  this.setState({ iframeURL: this.props.dataFromParent })
	  console.log(this.state.iframeURL)

  }
  
      handleCallback = (position,pov) =>{
        this.setState({spriteLat: position.lat,
					   spriteLng: position.lng,
					   spriteBearing: pov.bearing})
    }


	showScore = () =>{
		this.setState({showScore: true})
		
	}

	

	

	
		componentDidUpdate(prevProps,prevState) {
		if (prevState.showScore !== this.state.showScore) {
			const {lng, lat} = this.map.getCenter();
			var from = turf.point([this.state.spriteLng, this.state.spriteLat]);
			var to = turf.point([lng, lat]);
			var options = {units: 'kilometer'};

			let score = turf.distance([lng, lat], [this.state.spriteLng, this.state.spriteLat],'kilometers').toFixed(2);

			//=points

			
			
			this.setState({score: score})
			if (this.state.showScore===true) {
				setTimeout(
					() => this.props.startInd(false), 
					5000
				  );
				
		   }
		}
	}
	
	

	
	
  render() {
  let exp_ind;
	if (this.state.showScore===true) {
		exp_ind=
		 <h1 style={{position: 'absolute',fontSize: '3vh', top: '68vh',left:'5vw',width: '50vw',height: '5vw',Zindex:'2'}}>You were {this.state.score} km from the target</h1>;
	}
    return (
	<div>
		<Street parentCallback = {this.handleCallback.bind(this)}  imageId={this.state.iframeURL} />
		<div ref={this.mapContainer} className="map-container" />
		<img src={cross} alt="cross" style={{position: 'absolute',display: 'block', top: '79vh',left:'47.5vw',width: '5vw',height: '5vw',Zindex:'2'}}/>
		<button className="add-btn" onClick={this.showScore}>Lock in</button>
		{exp_ind}
		<CountdownTimer countdownTimestampMs={timeAvailable} showScore= {this.state.showScore}/>
	
		
		
			
	</div>

    );
  }
}
	    //<div class="sidebar">
	    //    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Photoid: {iframeURL}
		//</div>

