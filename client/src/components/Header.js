import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link }from 'react-router-dom';
import Payments from './Payments';

class Header extends Component 
{

    renderContent()
    {
        switch(this.props.auth)
        {
            case null :
                return 'Still Deciding';
            case false :
                return <li><a href='/auth/google'>Login with Google</a></li>;
            default :
                return [
                 <li key ="1"><Payments /></li>, 
                 <li key="2"> <a href='/api/logout'> Logout </a> </li>]
        }

    }

    render() 
    {
        console.log(this.props);

        return ( 
            <div className="container">
                <nav>
                    <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/'} >
                        SurveyEasily
                     </Link>
                     <ul id="nav-mobile" className="right">
                        <li> { this.renderContent() } </li>
                     </ul>
                   
                    </div>
                </nav>
        
            </div>
        );
    }
}

function mapStateToProps({auth})
{
    return { auth };
}

export default connect(mapStateToProps)(Header);