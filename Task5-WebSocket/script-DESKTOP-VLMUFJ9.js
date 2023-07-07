

const wsUri = "wss://CLUSTER_ID.piesocket.com/v3/ROOM_ID?api_key=API_KEY";

const output = document.querySelector('.messenger__window')
const textInput = document.querySelector('.js-input-text');
const btnSendMessage = document.querySelector('.js-btn-send');
const btnGeoLocation = document.querySelector('.js-btn-geoloc');




function writeToWindow(message) {
    let pre = document.createElement("p");
    pre.innerHTML = message;
    output.appendChild(pre);
}

// -------------- GeoLocation --------------
function getGeoPosition() {
    if(!navigator.geolocation) {
        alert('Geolocation not supported by the browser')
    } else {
        navigator.geolocation.getCurrentPosition(success, eror)
    }
} 

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude)
}

const eror = () => {
    alert('Информация о местоположении недоступна')
}
// -------------- / GeoLocation ----------
btnSendMessage.addEventListener('click', () => {

/* writeToWindow(textInput.value); */
const message = 'Test message';
websocket.send(message);
})

getGeoPosition() 