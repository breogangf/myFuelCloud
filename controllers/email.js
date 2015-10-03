var nodemailer = require('nodemailer');

var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')
var templateDir = path.join(__dirname, '../templates', 'welcome-email');

exports.sendMail = function(req, res){
    
    var name = req.body.name;
    var subject = req.body.subject;
    var from = req.body.from;
    var to = req.body.to;

    var newsletter = new EmailTemplate(templateDir);

    var user = {
        name: name
    };

        var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "xxxx@gmail.com",
            pass: "xxxx"
        }
    });

    newsletter.render(user, function (err, results) {
        if(err){
            console.log(err);
        }
        else{
            htmlResult = results.html;

            var mailOptions = {
                    subject: subject,
                    from: from,
                    to: to, 
                    html: htmlResult
                };
            
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                console.log(error);
                return res.send(500, error);
                }else{
                    res.status(201).end();
                }

            });
        }
    });
}