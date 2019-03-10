import React from 'react';
import {connect} from 'react-redux'
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';

const SurveyFormReview = (props) => {

    return <div>
           <h1> Please confirm your entries  </h1> 

            <div>
                <label > Survey Title :</label>
                <div>{props.formValues.title} </div>
            </div>
            <div>
                <label > Subject Line :  </label>
                <div>{props.formValues.subject} </div>
            </div>
            <div>
                <label > Email Body :  </label>
                <div>{props.formValues.body} </div>
            </div>
            <div>
                <label > Email recipients : </label>
                <div>{props.formValues.recipients} </div>
            </div>
           <button className="yellow darken-3 white-text btn-flat" onClick={props.onCancel}>Cancel</button>
           <button className="green white-text btn-flat right" onClick = {() => props.submitSurvey(props.formValues , props.history)}> Send Survey <i className="material-icons right">email </i> </button>
        </div>

} 

const mapStateToProps = (state) => {
    return {formValues:state.form.surveyForm.values}
}

export default connect(mapStateToProps , actions)(withRouter(SurveyFormReview));