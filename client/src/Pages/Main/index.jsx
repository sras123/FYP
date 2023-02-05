import { } from "react-router-dom";
import React from "react";



const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<>
		<style>
			@import url('/css/home.css');
		</style>
		<div class="banner">
		<div class="navbar">
			<img src="/images/logo.png" class="logo"></img>
			<ul>
				<li><a href="/aboutUs">About Us</a></li>
			    <li><a href="/contact">Contact</a></li>
			    <li><a href="/reviews">Reviews</a></li>
			    <li><a href="/signup">Signup</a></li>
				<li><a href="/login" onclick={handleLogout}>logout</a></li>
				
			
			</ul>
		</div>
		<div class= "content">
			<h1>Get Online Counseling</h1>
			<div>
				<button type="button"><span></span> Get Started </button>
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
			    <li><a href="/contact">Contact</a></li>
			    <li><a href="/reviews">Reviews</a></li>
				<li><a href="#">Privacy Policy</a></li>
			</ul>
			<p class="Copyright">
			@2023 My Psychiatrist
			</p>
		</div>

		</>
	
	);
};

export default Main;
{/* <header>
		<div id="menu-bar" class="fas fa-bars"></div>

		<a href="#" class="logo"> <span>My</span>Psychiatrist</a>
		<nav class="navbar">
			
			<a href="/aboutUs">About Us</a>
			<a href="/contact">Contact</a>
			<a href="/reviews">Reviews</a>
			<a href="/signup">Signup</a>
			<a href="/login">login</a>
			
			<Link to="/login">
		 		<button type="button" className={styles.white_btn} onClick={handleLogout}>
		 			Logout
			</button>
		 	</Link>
			
			
			
		</nav>
		</header>
	    <div className="img">
		
			<img src="./images/counsel1.jpg" alt=""></img>
			<button class="btn">
				Get Started
			</button>
		</div>
		 */}