// small dependencies
var fs = require('fs');

// synchronous dirty mail parser
var parser = module.exports = function (target, isFile) {
    if (target == null)
        return null;

    if (isFile)
        target = fs.readFileSync(target, "utf8");
    
    target = target.split(/\n\n/g);

    var mail = {};

    mail.header = target.splice(0,1)[0];
    mail.body = target.join('\n\n');

    // Parse Common Headers
    mail.subject = /Subject:.+/.exec(mail.header)[0].substr("Subject: ".length);
    mail.msgid = /Message-Id:.+/.exec(mail.header)[0].substr("Message-Id: ".length);
    mail.date = /Date:.+/.exec(mail.header)[0].substr("Date: ".length);
    mail.from = /From:.+/.exec(mail.header)[0].substr("From: ".length);

    // Parse Optional Headers
    if (/In-Reply-To:.+/.test(mail.header)) {
        mail.inReplyTo = /In-Reply-To.+/.exec(mail.header)[0].substr("In-Reply-To: ".length);
    } else {
        mail.inReplyTo = null;
    }

    return mail;
}