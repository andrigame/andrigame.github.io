var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BGwdqq3QdIW33TRe76ABEdXGCOL6MSWVdzELnZsI9S0gtP1vqJsLMAcYi8vqcJ0CIolG2wAahsraE9alEp_xp9A",
    "privateKey": "kEDaUXpvX4dx6goyNP343X8uKg9HHR41yBgxH90J0qE"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/d3gLebc4Lno:APA91bGKMHe8gpGIPPhZpE_tqdokVBHuVDBSw80Sx2_hHzkN0QAuiC4k6tvXBHM5aKVkk7bEsC_U-ol2CqcB5Y-Jis74NO7K42FfJmWwrtP5B-QaRcClfXzt0MbHBD7WbOsy65i0cNr6",
    "keys": {
        "p256dh": "BPUYDzB8jUSGUhPueXo9fAEp1CRKiTvub+OeyzwzB+uR46v2tWO11I1Z2y2EvGqjPJ86Yvcw1+Vd2o8psqQ3VTw=",
        "auth": "tswLsDZzSShrJk1jUhSi9Q=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
    gcmAPIKey: '6504246715',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);