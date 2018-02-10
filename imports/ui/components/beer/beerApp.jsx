import React, { Component, PropTypes  } from 'react';
import { Meteor } from 'meteor/meteor'

import BeerForm from '/imports/ui/components/beer/beerform.jsx';
import BeerList from '/imports/ui/components/beer/beerlist.jsx';
import BarChart from '/imports/ui/components/beer/barchart.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';


// define and export our Layout component
//export const beerAppLayout = (props) => props.content(props);
/*
export const beerAppLayout = ({content}) => (
    <div>
    <div id="render-target">---{content}</div>
    </div>
);
*/
//const beerApp = React.createClass({
export default class beerApp extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        beersSub: Meteor.subscribe('beersPub')
      }
    }
  };
  componentWillUnmount() {
      this.state.subscription.beersSub.stop();
  }

  getBeers() {
      return Beers.find({}).fetch(); //fetch must be called to trigger reactivity
  }



  	mapData() {
  		var data = [
  			{ qty: 0, xLabel: "Sun" },
  			{ qty: 0, xLabel: "Mon" },
  			{ qty: 0, xLabel: "Tue" },
  			{ qty: 0, xLabel: "Wed" },
  			{ qty: 0, xLabel: "Thu" },
  			{ qty: 0, xLabel: "Fri" },
  			{ qty: 0, xLabel: "Sat" },
  		];
  		this.data.beers.map(function(d) {data[moment(d.date).day()].qty += d.beers;});
	    return data;
  	};

	render() {
    console.log("render BeerApp.jsx ");
		return (
      <div>

  		   <div className="page-header">
  					<center>
  						<h1>
  						<i className="fa fa-beer"></i> Beer
  						<small> Dashboard</small></h1>
  					</center>
  			</div>

  			<div className="container">
  				<div className="row">
  					<div className="col-md-4">
  						<BeerForm />
  						<BeerList data={this.getBeers.bind(this)}/>
  					</div>

  					<div className="col-md-offset-2 col-md-6">
  						<BarChart data={this.mapData.bind(this)} width="480" height="320"/>
  					</div>
  				</div>
  			</div>
		  </div>
		);
	}
};
//export default beerApp;
