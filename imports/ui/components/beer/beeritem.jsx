import React, { Component, PropTypes  } from 'react';
export default class BeerItem extends Component {
  constructor(props) {
    super(props);
  }
  	handleClick() {
  		var id = this.props.beer._id;
  		Meteor.call("removeBeer", id, function(e) {
  			if (e) alert(e.reason);
  		});
  	}

	render() {
    var localLocale=moment(this.props.beer.date);
		var date = moment(this.props.beer.date).format("DD/MM/YYYY");
    //console.log("date:",this.props.beer.date);
    //console.log(date,"....",localLocale);
		var tail = this.props.beer.beers > 1 ? "tasas" : "tasa";

		return (
			<li onClick={this.handleClick.bind(this)}>El <strong>{date}</strong> se tomaron <strong>{this.props.beer.beers}</strong> {tail}</li>
		);
	}
}
