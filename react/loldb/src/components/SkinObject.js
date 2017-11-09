import React, { Component } from 'react';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';

class SkinObject extends Component {

	render () {
		let url = ("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/").concat(this.props.name + "_" + this.props.index + ".jpg");
		let name = this.props.thisSkin.name;
		// console.log(url)
		// console.log(this.props.name)
		// console.log(this.props.thisSkin)
		// console.log(this.props.index)
		return (
			<div>
					<h4><font color="white"><strong>{name}</strong></font></h4>
					<img src={url} className="skinImg img-responsive" alt=""  height={717} width={1215}/> 
			</div>	

	     );

	}

}

export default SkinObject;