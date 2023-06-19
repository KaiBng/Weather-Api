let weather = {
    apiKey: "644db26edfd1b5964dfd3815bbfc27ff",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("Keine Stadt gefunden.");
            throw new Error("Keine Stadt gefunden.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
        
    },

    /* data request sending and fetching variable datas */
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
    /*  const { sunrise } = data.sys;
      const { sunset } = data.sys; */
      
/* showing (echoing) the fetched data */
      document.querySelector(".city").innerText = "" + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png"; 
        document.querySelector(".description").innerText = "" + description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Feuchtigkeit: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Windgeschwindigkeit: " + speed + " km/h";
     /* document.querySelector(".sunrise").innerText = "Sonnenaufgang: " + sunrise;
      document.querySelector(".sunset").innerText = "Sonnenuntergang: " + sunset; */
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  /* code to proceed the searchbard searches */
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
    
  
  weather.fetchWeather("Denver");
