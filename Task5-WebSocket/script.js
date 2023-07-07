const wsUri = "wss://echo-ws-service.herokuapp.com/";

const output = document.querySelector('.messenger__window')
const textInput = document.querySelector('.js-input-text');
const btnSendMessage = document.querySelector('.js-btn-send');
const btnGeoLocation = document.querySelector('.js-btn-geoloc');

let latitude;
let longitude;

// ---- WebSocket ----
const websocketMessage = new WebSocket(wsUri);
    websocketMessage.onopen = () => {};
    websocketMessage.onmessage = function(evt) {
        getServerMessage(
        evt.data
        );
    }

const websocketLocatoin = new WebSocket(wsUri);
    websocketLocatoin.onopen = () => {};
    websocketLocatoin.onmessage = function(evt) {
        getServerMessage(
        `<a href= 'https://www.openstreetmap.org/#map=18/${evt.data.slice(0,evt.data.indexOf(','))}/${evt.data.slice(evt.data.indexOf(',')+1,-1)}'>mylocation</a>`
        );
    }

function getServerMessage(message) {
    if(!message == '') {
    let mesg = document.createElement("p");
    mesg.innerHTML = `<span class="title-server">Server</span><span class = "getdMassage">${message}</span>`;;
    output.appendChild(mesg);
    }
}

function sendClientMessage(message) {
    if(!message == '') {
    let mesg = document.createElement("p");
    mesg.innerHTML = `<span class="title-client">myMessage</span><span class = "sendMassage">${message}</span>`;
    output.appendChild(mesg);
    } else {
        alert('Enter your message')
    }
}

// ---- / WebSocket ----

// -------------- GeoLocation --------------
function getGeoPosition() {
    if(!navigator.geolocation) {
        alert('Geolocation not supported by the browser')
    } else {
        navigator.geolocation.getCurrentPosition(success, eror)
    }
} 

const success = (position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

}

const eror = () => {
    alert('Информация о местоположении недоступна')
}

getGeoPosition() 

// -------------- / GeoLocation ----------


btnSendMessage.addEventListener('click', () => {
    sendClientMessage(textInput.value);
    websocketMessage.send(textInput.value);
    textInput.value = '';
})

btnGeoLocation.addEventListener('click', () => {
    const location = [latitude, longitude];
    websocketLocatoin.send(location)
})

