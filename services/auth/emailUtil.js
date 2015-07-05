var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('PqEppqWRBHT7Pt1SsBcvDQ');

exports.sendActivationEmail = function(user, activation) {
    //please modify these when testing
    var receiver = "beetz12@gmail.com";
    var receiverName = "Chuck Norris";
    var sender = "donotreply@charaspark.com";
    var senderName = "CharaSpark";
    var subject = "Please Activate Your Account";
    var server = "http://localhost:8100/auth/";

    //console.log("activation v. in send email function",activation);

    var message = {
        "html": "",
        "text": "hello meeting",
        "subject": subject,
        "from_email": sender,
        "from_name": senderName,
        "to": [{
            "email": receiver,
            "name": receiverName,
            "type": "to"
        }],
        "headers": {
            "Reply-To": sender
        },
        "merge_language":"handlebars",
        "global_merge_vars":[
        {
            "name":"server",
            "content":server
        },
        {
            "name":"activation",
            "content":activation
        }
        ],
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "tags": [
            "signup confirmation"
        ],
        "recipient_metadata": [{
            "rcpt": receiver,
            "values": {
                "user_id": 55535
            }
        }]

    };

    var template_name = "signup";
    var template_content = [{
        "name": "example name",
        "content": "example content"
    }];

    var async = false;
    var ip_pool = "Main Pool";
    var send_at = "";

    mandrill_client.messages.sendTemplate({
        "message": message,
        "template_name":template_name, 
        "template_content": template_content,
        "async": async,
        "ip_pool": ip_pool,
        "send_at": send_at
    }, function(result) {
        // mandrill_client.messages.sendTemplate({"message": message, "template_name":template_name, "template_content": template_content,"async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
        console.log(result);
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};

exports.sendPasswordReset = function(user, resetHash) {
    //please modify these when testing
    var receiver = user.email;
    var receiverName = "Chuck Norris";
    var sender = "donotreply@charaspark.com";
    var senderName = "CharaSpark";
    var subject = "Reset Your Password";
    var server = "http://localhost:8100/auth/";

    var message = {
        "html": "<p>Reset your password by clicking <a href=\"" + server + resetHash + "\">here</a>",
        "text": "hello meeting",
        "subject": subject,
        "from_email": sender,
        "from_name": senderName,
        "to": [{
            "email": receiver,
            "name": receiverName,
            "type": "to"
        }],
        "headers": {
            "Reply-To": sender
        },
        "important": false,
        "track_opens": null,
        "track_clicks": null,
        "auto_text": null,
        "auto_html": null,
        "inline_css": null,
        "url_strip_qs": null,
        "preserve_recipients": null,
        "view_content_link": null,
        "tracking_domain": null,
        "signing_domain": null,
        "return_path_domain": null,
        "tags": [
            "signup confirmation"
        ],
        "recipient_metadata": [{
            "rcpt": receiver,
            "values": {
                "user_id": 55535
            }
        }]

    };

    var template_name = "signupConfirmationT";
    var template_content = [{
        "name": "example name",
        "content": "example content"
    }];

    var async = false;
    var ip_pool = "Main Pool";
    var send_at = "";

    mandrill_client.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool,
        "send_at": send_at
    }, function(result) {
        // mandrill_client.messages.sendTemplate({"message": message, "template_name":template_name, "template_content": template_content,"async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
        console.log(result);
        /*
        [{
                "email": "recipient.email@example.com",
                "status": "sent",
                "reject_reason": "hard-bounce",
                "_id": "abc123abc123abc123abc123abc123"
            }]
        */
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
}