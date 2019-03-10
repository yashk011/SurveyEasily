import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchSurveys} from '../../actions';

class SurveyList extends Component {
    
    componentDidMount() {
        console.clear();
        this.props.fetchSurveys();
    }
    
    renderSurveys() {
        //console.log(this.props.surveys);

        this.props.surveys.map(survey => {
            return (
                <div class="card blue-grey darken-1" key={survey._id}>
                   <div class="card-content white-text">
                    <span class="card-title">Card Title</span>
                    <p>{survey.body}</p>
                    <p className="right"> Sent on: {new Date(survey.date).toLocaleDateString()}</p>
              </div>
               <div class="card-action">
                
                 <a> Yes : {survey.yes}</a>
                
                 <a> No :  {survey.no}</a>
              </div>
             </div>


            )
        })

    }

    render() {
        
        // console.log(this.props);
        

        return <div> {this.renderSurveys()} </div>
    }

}

function mapStateToProps({surveys}) {
    return {surveys}
}

export default connect(mapStateToProps,{fetchSurveys})(SurveyList);
