var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('PqEppqWRBHT7Pt1SsBcvDQ');

exports.signupConfirmation = function(req,res) {
    //please modify these when testing
    var receiver = "nelbi.du@gmail.com";
    var receiverName = "HYtest2";
    var sender = "tsingpg@hotmail.com";
    var senderName = "HYtest1";
    var subject = "mandrill test";

   var message = {
    "html": "<p>I want a beautiful email</p>",
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
var async = false;
var ip_pool = "Main Pool";
var send_at = "";

mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
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