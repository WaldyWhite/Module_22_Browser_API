const btn = document.querySelector('.js-btn');
const statusGeo = document.getElementById('status');

const apiUrl = 'https://api.ipgeolocation.io/timezone?';
const apiKey = 'c5b8aee1cb63416d86e0c1530576fc3f';

const eror = () => {
    statusGeo.textContent = 'Информация о местоположении недоступна';
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    statusGeo.textContent = ` Широта: ${latitude}.  Долгота: ${longitude}.`
    requestDate (urlParams (apiUrl, latitude, longitude))
}

function urlParams (url, lat, long) {
    let urlObj = new URL(url);
    urlObj.searchParams.set('apiKey', apiKey );
    urlObj.searchParams.set('lat', lat);
    urlObj.searchParams.set('long', long);
    return urlObj;
}

function geoPosition () {
    if(!navigator.geolocation) {
        statusGeo.textContent = 'Geolocation не поддерживается браузером'
    } else {
        statusGeo.textContent = 'Поиск местоположения...';
        navigator.geolocation.getCurrentPosition(success, eror)
    }
}

function requestDate (apiData) {
        fetch(apiData)
        .then ((response) => {return response.json();})
        .then (data => {
            document.querySelector('.date').innerHTML = data.timezone;
            document.querySelector('.time').innerHTML = data.date_time_txt;
        })
}

btn.addEventListener('click' , () => {
    timeFlag = true;
    // Размеры экрана девайса\монитора.
    document.querySelector('.screen').innerHTML = `${window.screen.width} width &nbsp;&nbsp;&nbsp;${window.screen.height} height`;
    geoPosition();
})

