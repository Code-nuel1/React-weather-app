import React, { useState } from "react";
import broken from "./default.png";
import "./styles.css";

function App() {
	const [weatherdata, setWeatherdata] = useState({
		name: "",
		main: { temp: 0 },
		weather: [{ main: "", icon: "", description: "" }],
		sys: { country: "" },
	});

	const addtoweather = weather => {
		setWeatherdata({
			name: weather.name,
			main: { temp: weather.main.temp - 273.15 },
			weather: [
				{
					description: weather.weather[0].description,
					icon: weather.weather[0].icon,
					main: weather.weather[0].main,
				},
			],
			sys: { country: weather.sys.country },
		});
		document.getElementsByTagName(
			"img",
		)[0].src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
	};

	function changeunitToCelsius() {
		document.getElementById("temp").innerHTML =
			Math.floor(1.8 / weatherdata.main.temp + 31) + "°c";
	}
	function changeunitToFahrenhait() {
		document.getElementById("temp").innerHTML =
			Math.floor(weatherdata.main.temp * (9 / 5) + 32) + "°F";
	}
	function changeunitToKelvin() {
		document.getElementById("temp").innerHTML =
			Math.floor(weatherdata.main.temp) + "°K";
	}

	return (
		<div className="App">
			<div className="branding">
				<h1>Weather App</h1>
				<hr></hr>
			</div>
			<Addlocation addfromlocation={addtoweather} />
			<div className="weather-container">
				<div className="location">{weatherdata.name}</div>
				<div className="unit">
					<button onClick={changeunitToCelsius}>celsius</button>
					<button onClick={changeunitToFahrenhait}>Fahrenhait</button>
					<button onClick={changeunitToKelvin}>Kelvin</button>
				</div>
				<div className="temperature">
					<img id="icondisplay" src={broken} alt="icon" />
					<h1 id="temp">
						{Math.floor(weatherdata.main.temp * (9 / 5) + 32)}°F
					</h1>
					<div className="description">
						<p>{weatherdata.weather[0].main}</p>
						<p>{weatherdata.weather[0].description}</p>
						<p>{weatherdata.sys.country}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// to tell the api server location information to get (open weather map api)
function Addlocation(props) {
	const [location, setLocation] = useState("");

	const searchlocation = () => {
		if (location === "") {
			alert("please type in a cityname");
			return;
		} else {
			let key = "82005d27a116c2880c8f0fcb866998a0";
			fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`,
			)
				.then(response => response.json())
				.then(response => props.addfromlocation(response));
			setLocation("");
		}
	};

	return (
		<div className="App">
			<div className="input">
				<input
					type="text"
					placeholder="please type location"
					value={location}
					onChange={e => setLocation(e.target.value)}
					required
				/>
				<button onClick={searchlocation}>search</button>
			</div>
		</div>
	);
}

export default App;
