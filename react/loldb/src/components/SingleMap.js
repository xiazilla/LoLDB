import React, { Component } from 'react';
import myMaps from './maps.json';

class SingleMap extends Component{

	GetHtml( theJSON ) {
		var html = theJSON.description;
    	var div = document.createElement("div");
		div.innerHTML = html;
		var text = div.textContent || div.innerText || "";
		return text;
	}
	
	render() {
	

		return (
			<div> 
				<p>Single </p>
				
			</div>
		)
	}

}

export default SingleMap;