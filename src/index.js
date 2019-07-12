import './main.sass'
//import './skycons.js'

window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDesc = document.querySelector('.temp-desc')
    let tempDeg = document.querySelector('.temp-degree-number')
    let hum = document.querySelector('.hum')
    let apiKey = 'b686f0a7b5350c439e34fc3773ef9180'

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude

            const proxy = "https://cors-anywhere.herokuapp.com/"
            let apiUrl = `${proxy}https://api.darksky.net/forecast/${apiKey}/${lat},${long}`

            fetch(apiUrl)
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    const {temperature, summary, humidity, icon} = data.currently

                    tempDeg.textContent = Math.trunc(temperature)

                    hum.textContent = (humidity * 100) + '%'

                    tempDesc.textContent = summary

                    let setIcons = (icon, iconID) => {
                        let skycons = new Skycons()
                        let currentIcon = icon
                        skycons.play()
                        return skycons.set(iconID, currentIcon)
                    }

                    setIcons(icon, document.getElementById('icon1'))

                    //Next day loop setup
                    let nextLoop = document.getElementById('wrapper')
                    let y = ''

                    //converts UNIX timestamp coming from the API into a date, than gets the day of the date, and than converts the day array number into a string of the day name
                    let day = (y, q) => {
                        let d = new Date(q * 1000)
                        let x = d.getDay()
                        if(x == 0){
                            y = 'Sunday'
                        }
                        if(x == 1){
                            y = 'Monday'
                        }
                        if(x == 2){
                            y = 'Tuesday'
                        }
                        if(x == 3){
                            y = 'Wednesday'
                        }
                        if(x == 4){
                            y = 'Thursday'
                        }
                        if(x == 5){
                            y = 'Friday'
                        }
                        if(x == 6){
                            y = 'Saturday'
                        }

                        return y
                    }

                    //define the icon to use based on API data
                    let iconFn = (icon, iconApi) => {
                        //append <i class="wi wi-day-sunny"></i>
                        //1. find out the weather
                        //2. find out if it's day or night

                        if(iconApi == 'rain'){
                            let b = document.getElementById('icon')
                            b.innerHTML += `<i class="wi wi-rain"></i>`
                        }

                        return icon
                    }

                    for (let z = 0; z <= 6; z++){
                        let t = new Date((data.daily.data[z + 1].time))



                        // let skycons = new Skycons({"color": "black"});
                        // let iconAPP = data.daily.data[z].icon
                        // iconAPP.replace(/-/g, "_").toUpperCase()
                        // skycons.add(document.getElementById("icon2"), Skycons.iconAPP);
                        // skycons.play();



                        nextLoop.innerHTML +=
                            `
                            <div class="tile tile__next">
                                <p class="tile--day">${day(y, t)}</p>
                                <div id="icon">${iconFn()}</div>
                                <p class="tile--temp">${Math.trunc((Math.round(data.daily.data[z].temperatureLow) + Math.round(data.daily.data[z].temperatureHigh)) / 2)}</p>
                                <p class="tile--temp__low">${Math.round(data.daily.data[z].temperatureLow)}</p>
                                <p class="tile--temp__high">${Math.round(data.daily.data[z].temperatureHigh)}</p>
                            </div>
                            `
                    }
                })
        })
    }
    else{
        //append a search input
    }
});