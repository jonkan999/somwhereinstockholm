
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
const timeAvailable = 60



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


			const markerPlayer = new mapboxgl.Marker({
				color: 'teal'
				})
			.setLngLat([lng, lat])
			.addTo(this.map);

			const markerTarget = new mapboxgl.Marker({
				color: 'hotpink'
				})
			.setLngLat([this.state.spriteLng, this.state.spriteLat])
			.addTo(this.map);
			
			
			this.setState({score: score})

		}
	}
	
	

	
	
  render() {
  let exp_ind;
	if (this.state.showScore===true) {
		exp_ind=
		<div>
		 <h1 style={{position: 'absolute',fontSize: '3vh', top: '65vh',left:'5vw',width: '50vw',height: '5vw',Zindex:'2'}}>You were {this.state.score} km from the target, good job!</h1>//
		 <button className="reset-btn" onClick={() => { this.props.startInd(false) }}>Try again</button>
		</div>
		;
		 
	} else {
		
		exp_ind = <button className="add-btn" onClick={this.showScore}>Lock in</button>;
	}
    return (
	<div>
		<Street parentCallback = {this.handleCallback.bind(this)}  imageId={this.state.iframeURL} />
		<div ref={this.mapContainer} className="map-container" />
		<img src={cross} alt="cross" style={{position: 'absolute',display: 'block', top: '77.43vh',left:'47.52vw',width: '5vw',height: '2.5vh',Zindex:'2'}}/>
		<CountdownTimer countdownTimestampMs={timeAvailable} showScore= {this.state.showScore}/>
		{exp_ind}
		
	</div>

    );
  }
}
	    //<div class="sidebar">
	    //    Longitude: {lng} | Latitude: {lat} | Zoom: {zoom} | Photoid: {iframeURL}
		//</div>

