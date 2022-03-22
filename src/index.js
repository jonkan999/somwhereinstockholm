import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import Somewhere from './Somewhere';

ReactDOM.render(
  <React.StrictMode>
	<div>
	<Somewhere/>
	

	</div>
  </React.StrictMode>,
  document.getElementById('root')
);
//imageId={App.get('iframeURL')}
//<Street imageId= {document.getElementsByClassName('sidebar').innerHTML} />