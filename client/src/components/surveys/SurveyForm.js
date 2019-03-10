import React from 'react';
import {reduxForm , Field } from 'redux-form';
import SurveyField from'./SurveyField';
import _ from 'lodash';
import {Link} from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    {label:'Survey Title :' , name : 'title'},
    {label : 'Subject Line :' , name:'subject'},
    {label : 'Email Body : ' , name : 'body'},
    {label : 'Recipients List ' , name : 'recipients' }
]
class SurveyForm extends React.Component {

     /* <Field type="text" name="title" component={SurveyField} label="  "/>
                <Field type="text" name="subject" component={SurveyField} label=" "/>
                <Field type="text" name="emai" component={SurveyField} label="Email Body : "/>
                <Field type="text" name="recipients" component={SurveyField} label=" "/> 
      */
    renderField() {
        return _.map(FIELDS,field => {
            return <Field key={field.name} component={SurveyField} type="text" label={field.label} name={field.name}/>
        })
    }

    render() {

       return  <div> 
            <form onSubmit={this.props.handleSubmit( this.props.onSurveySubmit)} >
                {this.renderField()}
                <Link to="/surveys" className="red btn-flat left white-text">Cancel</Link>
                <button className="teal btn-flat right white-text" type="submit"> Next
                <i className="material-icons right" > done </i> </button>
                
            </form>
            </div>

    }


}

function  validate(values) {
        const errors = {};
        
        errors.recipients = validateEmails(values.recipients || '');

        _.each(FIELDS , ({name}) => {
            if(!values[name]) 
                errors[name] = 'You must provide a value ';
        })

        return errors;

    } 

export default reduxForm({form : 'surveyForm', destroyOnUnmount : false ,validate: validate})(SurveyForm);