import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.querySelector('address') as HTMLInputElement;
const API_KEY = 'SDSDDSDDDsdasdasdasdasdwewewewdSADasdwedaxcWewe';

type GoogleGeoResponse = {
    results: {  geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' |'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
    event.preventDefault();

    const enteredAddress = addressInput.value;

    // send to Googles API
    axios.get<GoogleGeoResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)},+Mountain+View,+CA&key=${API_KEY}`
    )
    .then( response => {
        if (response.data.status !== 'OK') {
            throw new Error("Could not fetch location");
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map")!, {
            center: coordinates,
            zoom: 16
        });

        new google.maps.Marker({ position: coordinates, map: map });
    })
        .catch(err => {
            alert(err.message);
            console.log(err);
        });
}

form.addEventListener('submit', searchAddressHandler)