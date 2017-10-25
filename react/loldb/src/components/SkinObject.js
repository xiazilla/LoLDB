import React, { Component } from 'react';


class SkinObject extends Component {

	render () {

		let url = ("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/").concat(this.props.name + "_" + this.props.index + ".jpg");
		let name = this.props.thisSkin.name;

		return (
			<div className="col-sm-3 ">
					<img src={url} className="skinImg img-responsive" alt="" height={150} width={250}/> 
					<h4><strong>{name}</strong></h4>
			</div>	

	     );

	}

}

export default SkinObject;