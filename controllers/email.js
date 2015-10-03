var nodemailer = require('nodemailer');

exports.sendMail = function(req, res){
    
    var subject = req.body.subject;
    var from = req.body.from;
    var to = req.body.to;
    var message = req.body.message;

    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "xxxx@gmail.com",
            pass: "xxxx"
        }
    });
    var mailOptions = {
        subject: subject,
        from: from,
        to: to, 
        html: message
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
            console.log(error);
            return res.send(500, error);
        }else{
            res.status(201).end();
        }

    });
}