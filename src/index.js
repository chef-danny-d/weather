import './main.sass'
//import 'skycons'

window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDesc = document.querySelector('.temp-desc')
    let tempDeg = document.querySelector('.temp-degree-number')
    let locTime = document.querySelector('.location-timezone')
    let iconID = document.querySelector('.location-icon')
    let apiKey = '2e48de904312892143be954d60027dd6'

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const apiUrl = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`

            fetch(apiUrl)
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    //console.log(data.main.temp)
                    tempDeg.textContent = data.main.temp
                    //let celsiusTemp = (Math.round(temperature) − 32) * 5/9
                    //console.log(celsiusTemp)
                    tempDesc.textContent = data.weather[0].description
                    //locTime.textContent = data.timezone.replace(/_/g, " ")
                    locTime.textContent = data.timezone

                    //setIcons(icon, iconID)
                })
        })
    }
    else{
        //append a search input
    }

    // let setIcons = (icon, iconID) => {
    //     const skycons = new Skycons({color: "white"})
    //     const currentIcon = icon.replace(/-/g, "_").toUpperCase()
    //     skycons.play()
    //     return skycons.set(iconID, Skycons[currentIcon])
    // }
});