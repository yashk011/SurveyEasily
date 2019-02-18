const requireLogin =  require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');
const surveyTemplate  = require('../services/emailTemplates/surveyTemplates');
const Mailer = require('../services/Mailer');
const Survey = mongoose.model('surveys');

module.exports = app => {
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