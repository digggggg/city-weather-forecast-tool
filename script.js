var search = document.querySelector('#city-search');
var jumbo = document.querySelector(".jumbotron")
var subBtn = document.querySelector('#sub-btn')
var hist = document.querySelector("#hist-list")
var histsearch = document.querySelector(".historysearch")
var cityArr = []
var app_key = 'be4ac1191c9c135713ec052844363897'
init();  
function saveSearch(event){
    event.preventDefault()

   var newInfo = search.value.trim()
    
    if (newInfo === cityArr.length - 1){
        cityArr[cityArr.length - 1] = newInfo
    }else {
        cityArr[cityArr.length] = newInfo
    }
    


    localStorage.setItem("history", JSON.stringify(cityArr))
    console.log(localStorage)

    jumboFill(newInfo);
}


function generateHist(){

    var tempArr = JSON.parse(localStorage.getItem("history"))

    for (var i = 0; i < tempArr.length; i++){
        var newP = document.createElement("p")
        newP.setAttribute("class", "historysearch")
        newP.textContent = cityArr[i]
        hist.appendChild(newP)
        }
    
}

function init(){
    var tempArr = JSON.parse(localStorage.getItem("history"))

    if (tempArr !== null){
        cityArr = tempArr
        generateHist();   
    }
}

function jumboFill(newInfo){
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + newInfo + "&units=imperial&appid=" + app_key
    var date =""
    var cityName = ""
    var temperature = ""
    var humidity = ""
    var windSpeed =""
    var uvi = ""
        $.ajax({
            url: apiUrl,
            method: "GET"
        }).then(function (response){
            date = response.dt
            console.log(date)
            cityName = response.name
            console.log(cityName)
            temperature = response.main.temp
            console.log(temperature)
            humidity = response.main.humidity
            console.log(humidity)
            windSpeed = response.wind.speed
            console.log(windSpeed)
            uvi = response.uvi
            console.log(uvi)

            var hero = moment().format("DD/MM/YY")
            var hj = document.createElement("h2")
            hj.textContent = cityName + " (" + hero + ")"
                
            var tj = document.createElement('p')
            tj.textContent = "Temperature: " + temperature + " °F"

            var humj = document.createElement('p')
            humj.textContent = "Humidity: " + humidity + "%"

            var wj = document.createElement("p")
            wj.textContent = "Wind Speed: " + windSpeed + " MPH"

            jumbo.appendChild(hj)
            jumbo.appendChild(tj)
            jumbo.appendChild(humj)
            jumbo.appendChild(wj)


        })
}

function hs(event){
var tar = event.target.value
    jumboFill(tar);
}
subBtn.addEventListener("click", saveSearch);
document.addEventListener("click historysearch", hs)