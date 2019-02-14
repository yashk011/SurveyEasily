module.exports = (req,res,next) => {      // next when the middleware is done !!!
    if(!req.user)
    {
        return res.status(401).send({error:'You must be logged in !!'});
    }

    next();
    
};