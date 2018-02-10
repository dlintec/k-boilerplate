import React, { Component, PropTypes  } from 'react';
import BeerItem from '/imports/ui/components/beer/beeritem.jsx';
export default class BeerList extends Component {
  constructor(props) {
    super(props);

	}
  renderBeers() {
    //console.log("renderBeers... ",this);
    var vcount=0;
   return this.props.data.map((beer) => {
     vcount=vcount+1;
     //console.log("renderBeers:",vcount);
     return <BeerItem beer={beer} key={beer._id}/>;

   });
  }

	render() {
		return (
			<div className="panel panel-default">
			  <div className="panel-heading">
			    <h3 className="panel-title">Histórico
			    <small> click para eliminar</small>
			    </h3>
			  </div>
			  <div className="panel-body">
			    <ul>
			    	{this.renderBeers()}
			    </ul>
			  </div>
			</div>
		);
	}
}
