const EventEmitter = require('events');
const fs = require('fs');
const eventEmitter = new EventEmitter();


const filePath = 'summary.txt';

let eventsTrigger = {
    'user-login': 0,
    'user-logout': 0,
    'user-purchase': 0,
    'profile-update': 0
}

if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    eventsTrigger = JSON.parse(data);
}
eventEmitter.on('userLogin', (userName) => {
    eventsTrigger['user-login']++
    console.log(`${userName}, Successfully Login`)
    saveSummaryToFile();
})

eventEmitter.on('userLogout', (username) => {
    eventsTrigger['user-logout']++
    console.log(`${username}, Successfully Logout`)
    saveSummaryToFile();
})

eventEmitter.on('userPurchase', (username, item) => {
    eventsTrigger['user-purchase']++
    console.log(`${username}, Successfully Purchased ${item}`)
    saveSummaryToFile();
})

eventEmitter.on('profileUpdate', (username, profileData) => {
    eventsTrigger['profile-update']++
    console.log(`${username}, Successfully Updated Profile`)
    saveSummaryToFile();
})

function saveSummaryToFile() {
    fs.writeFile(filePath, JSON.stringify(eventsTrigger), (err) => {
        if (err) throw err;
    })
}
eventEmitter.on('summary', () => {
    console.log('Summary of Events Triggered:');
    console.log(`User Login: ${eventsTrigger['user-login']}`);
    console.log(`User Logout: ${eventsTrigger['user-logout']}`);
    console.log(`User Purchase: ${eventsTrigger['user-purchase']}`);
    console.log(`Profile Update: ${eventsTrigger['profile-update']}`);
})

eventEmitter.emit('userLogin', 'Test');
eventEmitter.emit('userPurchase', 'Test', 'Laptop');
eventEmitter.emit('profileUpdate', 'Test', { email: 'test@t.com' });
eventEmitter.emit('userLogout', 'Test');
eventEmitter.emit('summary');
eventEmitter.emit('userLogin', 'LegalThief');

eventEmitter.emit('summary');




