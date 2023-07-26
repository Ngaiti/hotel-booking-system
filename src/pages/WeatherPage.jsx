import { getAuth } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import NavigationBar from "../components/NavigationBar";

const api = {
	key: "4f8e795dcd6dbf7b9f5276bff095ffc1",
	base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherPage() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const [currentTime, setCurrentTime] = useState("");

	const auth = getAuth();
	const navigate = useNavigate();
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser, navigate]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const handleLogout = () => {
		const confirmed = window.confirm("Are you sure you want to logout?");
		if (confirmed) {
			auth.signOut();
		}
	};

	const search = (evt) => {
		if (evt.key === "Enter") {
			fetch(`${api.base}weather?q=${query}&appid=${api.key}&units=metric`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery("");
					console.log(result);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	return (
		<div
			className={
				typeof weather.main != "undefined"
					? weather.main.temp > 16
						? "app warm"
						: "app"
					: "app"
			}
		>
			<NavigationBar handleLogout={handleLogout} />

			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						placeholder="Enter Location"
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != "undefined" ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">
								{dateBuilder(new Date())} {currentTime}
							</div>
						</div>
						<div className="weather-box">
							<div className="temp">
								{Math.round(weather.main.temp)}°C
							</div>
							<div className="weather">
								{weather.weather[0].main}
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</main>
		</div>
	);
}

export default WeatherPage;
