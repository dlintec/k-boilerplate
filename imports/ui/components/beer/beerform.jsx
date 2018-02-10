import React, { Component, PropTypes  } from 'react';
import ReactDOM from 'react-dom';
export default class BeerForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      numBeers:"",
      beerDate:""
    }

  }
  componentDidMount(){
     this.setState({ numBeers:this._numBeers});
     this.setState({ beerDate:this._beerDate});

    //  console.log("BeerForm.componentDidMount...",this);
  }
	handleSubmit(e) {
		e.preventDefault();
    //console.log("BeerForm.handleSubmit...",this);
		//var numBeers = ReactDOM.findDOMNode(this.refs.numBeers);
		//var beerDate = ReactDOM.findDOMNode(this.refs.beerDate);

		Meteor.call("insertBeer", this._numBeers.value, moment(this._beerDate.value).toDate(), function(e, r) {
			if (e) alert(e.reason)
		});

		this.state.numBeers.value = "";
		this.state.beerDate.value = "";
	}

	render() {
		return (
			<div className="panel panel-default">
			  <div className="panel-heading">
			    <h3 className="panel-title">Tasas al dia</h3>
			  </div>
			  <div className="panel-body">
			    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
				  <div className="form-group">
				    <div className="col-sm-10">
				      <input type="number" className="form-control" defaultValue="1"
				      		placeholder="Cuantas tasas?" ref={(c) => this._numBeers = c} />
				    </div>
				  </div>
				  <div className="form-group">
				    <div className="col-sm-10">
				      <input type="date" className="form-control" placeholder="fecha dd/mm/aaaa" ref={(c) => this._beerDate = c}/>
				    </div>
				  </div>

				  <div className="form-group">
				    <div className="col-sm-10">
				      <button type="submit" className="btn btn-primary btn-block">Agregar</button>
				    </div>
				  </div>
				</form>
			  </div>
			</div>
		);
	}
}
