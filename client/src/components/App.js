 import React , {Component} from 'react';
import {BrowserRouter , Route} from 'react-router-dom';
import Header from './Header';
import {connect} from 'react-redux';
import * as actions  from '../actions';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew  from './surveys/SurveyNew';

//import Dashboard from './Dashboard';
//import Surveynew from './Surveynew';

//const Header = () => <h2> Header </h2>;
//const Dashboard = () => <h2> Dashboard </h2>;
//const Surveynew = () => <h2> Surveynew </h2>;


class App extends Component {

    componentDidMount()
    {
        this.props.fetchUser();
    }

    render()
    {
        return (
            <div>
            <BrowserRouter>
               
               <div className = "container"> 
                   <Header />
                   <Route exact path= '/' component={Landing} />
                   <Route exact path = '/surveys' component ={Dashboard} />
                   <Route path = '/surveys/new' component ={SurveyNew} />
                   
               </div>

            </BrowserRouter>
            
            </div>
        );
    }
}


export default connect(null,actions)(App);
  