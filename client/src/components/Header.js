import React,{Component} from 'react';
import { connect } from 'react-redux';

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
                return <li> <a href='/api/logout'> Logout </a> </li> ;
        }

    }

    render() 
    {
        console.log(this.props);

        return ( 
            <div className="container">
                <nav>
                    <div classname="nav-wrapper">
                     <a classname="brand-logo">SurveyEasily</a>
                     
                     <ul id="nav-mobile" class="right">
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