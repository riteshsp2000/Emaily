import '../css/main.css'

import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Header from './Header'
import Landing from './Landing'
const SurveyNew = () => <h1>SurveyNew</h1>
const Dashboard = () => <h1>Dashboard</h1>


class App extends React.Component {
  
  componentDidMount () {
    this.props.fetchUser();
  }
  
  render () {
    return (
      <div className="custom-global-css container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);