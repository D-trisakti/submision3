var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BJ0OvcLd7MAMN9_-DgnJTsG5HcRryo2AxamxBEfvUdQYu7M4FcOtdhIC3QWRmZteZdzwoNmWa6pdlJfTHPsh4Rg",
    "privateKey": "zE1KXO1SuXuW3wfUtOxgYhDb5gWTG5RWmDojNSNrHbE"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dBh-kcgLUr4:APA91bHGJyZfiUjRMdvX7FtPcnxT3w3bs_WhsfMa1fxStZHoWFSKGE4el_4Wnij1SfrJlKQcGVpXaLvbqX-wwp7nvS4hOwNQ8rzpEW8prd-F2QFFyCGA2UWqqOHmUZ14SvMYbg1p9HI4",
    "keys": {
        "p256dh": "BNm08iGX4vW7WZUj/0HGuzwtAgkfGQL8FK2bRLLp1P2MRYETB7Q25YgYDEIzjInKVgAf/6Dl+yhbghcxzKKw1iY=",
        "auth": "bTzu8SB3rp5YXXvX2D8hig=="
    }
};
var payload = 'Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '827285260266',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);