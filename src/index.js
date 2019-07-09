import './main.sass'
//import 'skycons'

window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDesc = document.querySelector('.temp-desc')
    let tempDeg = document.querySelector('.temp-degree-number')
    let locTime = document.querySelector('.location-timezone')
    let iconID = document.querySelector('.location-icon')
    let apiKey = 'b686f0a7b5350c439e34fc3773ef9180'

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const apiUrl = `${proxy}https://api.darksky.net/forecast/${apiKey}/${lat},${long}`

            fetch(apiUrl)
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;

                    tempDeg.textContent = Math.round(temperature)
                    //let celsiusTemp = (Math.round(temperature) − 32) * 5/9
                    //console.log(celsiusTemp)
                    tempDesc.textContent = summary
                    locTime.textContent = data.timezone.replace(/_/g, " ")

                    setIcons(icon, iconID)
                })
        })
    }
    else{
        //append a search input
    }

    let setIcons = (icon, iconID) => {
        const skycons = new Skycons({color: "white"})
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconID, Skycons[currentIcon])
    }
});