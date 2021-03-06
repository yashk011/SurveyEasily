import React from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends React.Component {
    
    state = {showReview : false};

    renderContent() {
        if(this.state.showReview === true)
        {
            return <SurveyFormReview onCancel={() => {this.setState({showReview : false})}} />
        }
        else
        {
            return <SurveyForm onSurveySubmit={() => this.setState({showReview : true})} />
        }
    }
    render() {

       return  <div> 
                {this.renderContent()}
            </div>

    }

}

export default reduxForm({form : 'surveyForm'})(SurveyNew);