import React, { Component, PropTypes  } from 'react';
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data';
import Task from './Task.jsx';
import BeerForm from '/imports/ui/components/beer/beerform.jsx';
import BeerList from '/imports/ui/components/beer/beerlist.jsx';
import BarChart from '/imports/ui/components/beer/barchart.jsx';
import beerApp from '/imports/ui/components/beer/beerApp.jsx';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

 // App component - represents the whole app

export default class reactApp extends TrackerReact(React.Component) {
  constructor(props) {
      super(props);
      this.state = {
        subscription: {
          beersSub: Meteor.subscribe('beersPub')
        }
      }


  }
  componentWillUnmount() {
      this.state.subscription.beersSub.stop();
  }

  getTasks() {
  //console.log("getTasks...");
   return [
      { _id: 1, text: 'This is task 1' },
      { _id: 2, text: 'This is task 2' },
      { _id: 3, text: 'This is task 3' },
    ];
  }


  renderTasks() {
    //console.log("renderTasks...");
    return this.getTasks().map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
      {/*}  <header>
          <h1>Todo List</h1>
        </header>
        {this.renderTasks()} */}

        {this.renderBeersApp()}

        <ul>

        </ul>
      </div>
    );
  }

  renderBeersApp() {
    var testattr=orion.attribute('image', {
     label: "Background image (optional)",
     optional: true
   })
   console.log("renderBeersApp... ",testattr);

    var theBeers=Beers.find({}).fetch();

    var data = [
      { qty: 0, xLabel: "Sun" },
      { qty: 0, xLabel: "Mon" },
      { qty: 0, xLabel: "Tue" },
      { qty: 0, xLabel: "Wed" },
      { qty: 0, xLabel: "Thu" },
      { qty: 0, xLabel: "Fri" },
      { qty: 0, xLabel: "Sat" },
    ];
    theBeers.map(function(d) {data[moment(d.date).day()].qty += d.beers;});



    return (
      <div>

  		   <div className="page-header">
  					<center>
  						<h1>
  						<i className="fa fa-coffee "></i> cuantas</h1>
  					</center>
  			</div>

  			<div className="container">
  				<div className="row">
            <div className="col-md-4">
  						<BeerForm />
              <BeerList data={theBeers}/>

  					</div>

  					<div className="col-md-offset-2 col-md-6">
  						<BarChart data={data} width="300" height="320"/>
  					</div>
  				</div>
  			</div>
		  </div>
		);
  }
}
