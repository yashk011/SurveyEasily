const _ = require('lodash');
const Path = require('path-parser').default;
const {URL} = require('url');
const requireLogin =  require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const surveyTemplate  = require('../services/emailTemplates/surveyTemplates');
const Mailer = require('../services/Mailer');

const Survey = mongoose.model('surveys');


module.exports = app => {

    app.post('/api/surveys/webhooks' , (req,res) => {
        
        const p = new Path('/api/surveys/:surveyId/:choice');

       _.chain(req.body)
         .map( (event) => {

            const match = p.test(new URL(event.url).pathname);
            if(match){
                return {email : event.email , surveyId : match.surveyId , choice :  match.choice}
            }    
        })
        .compact()
        .uniqBy( 'email' , 'surveyId')
        .each( ({email,surveyId,choice}) => {
            Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch : {email : email , responded:false}
                }
            } ,{
                $inc: {[choice] : 1},
                $set:{'recipients.$.responded' : true},
                lastRespondedAt : new Date()
            }).exec();
        })
        .value();

        res.send({})

    });
    app.get('/api/surveys/:surveyId/:choice', (req,res) => {
        res.send('Thanks for the review');
    });
    app.post('/api/surveys', requireCredits , requireLogin ,  async  (req,res) => {
         const { title,subject,body,recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email =>  ({ email:email.trim() }) ) ,
            _user: req.user.id,
            dateSent: Date.now(),

        });
        
        const mailer = new Mailer(survey, surveyTemplate(survey));
        
        try{
            await mailer.send(); 
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        }

        catch(e){
            console.log(e);
            res.status(422).send(e);
        }
    });
};