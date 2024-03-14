function prayer(year, month, day, city, country) {
    axios.get(`https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=${country}`)
        .then((response) => {

            document.querySelector(".day h2").innerHTML = response.data.data[`${day-1}`]['date']['gregorian']['weekday']['en']
            let const1 = response.data.data[day-1]['timings'];
        
            document.querySelector(".fajr h3").innerHTML = const1['Fajr'].match(/[0-9]+:[0-9]+/)[0]
            document.querySelector(".sunrise h3").innerHTML = const1['Sunrise'].match(/[0-9]+:[0-9]+/)[0]
            document.querySelector(".dhuhr h3").innerHTML = const1['Dhuhr'].match(/[0-9]+:[0-9]+/)[0]
            document.querySelector(".asr h3").innerHTML = const1['Asr'].match(/[0-9]+:[0-9]+/)[0]
            document.querySelector(".maghrib h3").innerHTML = const1['Maghrib'].match(/[0-9]+:[0-9]+/)[0]
            document.querySelector(".isha h3").innerHTML = const1['Isha'].match(/[0-9]+:[0-9]+/)[0]

        })
}

let date = document.querySelector("input[type='date']")

//! for start
let currentDate = new Date()
let y = currentDate.getFullYear()
let m = currentDate.getMonth() + 1
let d = currentDate.getDate()

if (m > 0 && m <10) {
    document.querySelector("input").value = `${y}-0${m}-${d}`
}
else {
    document.querySelector("input").value = `${y}-${m}-${d}`
}
prayer(y, m, d, "Syria", "Damascus")

let damascus = document.querySelector(".damascus")

for (let i = 0; i < damascus.className.split(' ').length; i++) {
    if (damascus.className.split(' ')[i] === "active") {
        date1("Syria","Damascus")
    }
}
//! for start

function date1(city, country) {
    date.addEventListener("input", () => {
        let year = date.value.split('-')[0]
        let month = date.value.split('-')[1]
        let day = date.value.split('-')[2]
        prayer(year, month, day, city, country)
    })
}

function clickActive(e) {
    let arr = document.getElementsByClassName("city")
    for (i of arr) {
        i.classList.remove("active")
    }
    e.classList.add("active")
    if (e.innerHTML == "Damascus") {
        date1("Syria",e.innerHTML)
        currentDateInDateInput("Syria",e.innerHTML)
    }
    else if (e.innerHTML == "Beijing") {
        date1("China",e.innerHTML)
        currentDateInDateInput("China",e.innerHTML)
    }
    else if (e.innerHTML == "Dubai") {
        date1("UAE",e.innerHTML)
        currentDateInDateInput("UAE",e.innerHTML)
    }
    else if (e.innerHTML == "Riyadh") {
        date1("Saudi Arabia",e.innerHTML)
        currentDateInDateInput("Saudi Arabia",e.innerHTML)
    }
    else if (e.innerHTML == "Kuwait") {
        date1("Kuwait",e.innerHTML)
        currentDateInDateInput("Kuwait",e.innerHTML)
    }
}

function currentDateInDateInput(city,country) {
    let newDate = document.querySelector("input").value
    prayer(newDate.split('-')[0],newDate.split('-')[1],newDate.split('-')[2],city,country)
}