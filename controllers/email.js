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

var generator = require('xoauth2').createXOAuth2Generator({
    user: '{username}',
    clientId: '{Client ID}',
    clientSecret: '{Client Secret}',
    refreshToken: '{refresh-token}',
    accessToken: '{cached access token}' // optional
});

// listen for token updates
// you probably want to store these to a db
generator.on('token', function(token){
    console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generator
    }
}));

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
            
            transporter.sendMail(mailOptions, function(error, response){
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