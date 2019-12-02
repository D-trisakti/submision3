var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BIkl35vY95x_bjVWwwvDHtDcxEsrtNbctlermpQPBYlXs2k1mq92EsUPMQCYIaG4H4EkKArQ-j4Lp4Bn2IJraUs",
    "privateKey": "XQ4VT-f0XRwz_v1-bxFXum0QM3hQCTkpEXFyrWLne_A"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ebUhhZslahc:APA91bEbv_2r1cLURqreA6jAZGXJItqXYvLfNd-PSAaYLlA5-VNHpd9xbfEfkCVf1SGPdhoDzjsEcL-Y1xjNDESKXNi4n1bAhef8-Dc6nF0A9ztSUgk8Ct6DukGqAwKhtlZ1zFu0I4zW",
    "keys": {
        "p256dh": "BOgITGZQHaYbdZqxx4VA6PsjZ9K0nmgR2i0FTBPTiH94ucAUiSLtyN3XT8dzr0uruCGSUd20Dj+gdU024GM6ktQ=",
        "auth": "xmyX65tIs77hHFd8zI+3hg=="
    }
};
var payload = 'Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '405861049850',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);