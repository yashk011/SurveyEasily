import authReducer from './authReducer';
import surveyReducers from './surveyReducers'

import {combineReducers} from 'redux';
import {reducer as reduxForm} from 'redux-form';

export default combineReducers({
    auth: authReducer,
    form : reduxForm ,
    surveys : surveyReducers
});
