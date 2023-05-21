import { Link, useHistory } from "react-router-dom";
import React from "react";

const Main = () => {
	const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};

	return (
		<>
			<style>
				@import url('/css/home.css');
			</style>
			<div class="banner">
				<div class="navbar">
					<Link to="/" >
						<img src="/images/logo2.png" class="logo"></img>
					</Link>
					<ul>
						<li><a href="/aboutUs">About Us</a></li>
						<li><a href="/doctors">Doctors</a></li>
						<li><a href="/room">Room</a></li>
						<li><a href="/reviews">Reviews</a></li>
						<li><a href="/login" onClick={handleLogout}>Logout</a></li>


					</ul>
				</div>
				<div class="content">
					<h1>Get Online Counseling</h1>
					<div>
						<Link to="/doctors" >
							<button type="button"><span></span> Book Now</button>
						</Link>
					</div>
					<div>
						<Link to="/apply" >
							<button type="button"><span></span> Apply as Psychiatrist</button>
						</Link>
					</div>
				</div>
			</div>
			<div class="footer">
				<div class="social">
					<a href="#"><i class="fab fa-instagram"></i></a>
					<a href="#"><i class="fab fa-facebook"></i></a>
					<a href="#"><i class="fab fa-twitter"></i></a>
				</div>
				<ul class="list">
					<li><a href="/aboutUs">About Us</a></li>
					<li><a href="/reviews">Reviews</a></li>
					<li><a href="/privacypolicy">Privacy Policy</a></li>
				</ul>
				<p class="Copyright">
					@2023 My Psychiatrist
				</p>
			</div>

		</>

	);
};

export default Main;
