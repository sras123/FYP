import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const AboutUs = () => {
	const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};

	return (
		<>
			<style>
				@import url('/css/about.css');
			</style>

			<div class="navbar">
				<Link to="/" >
					<img src="/images/logo2.png" class="logo"></img>
				</Link>
				<ul>
					<li><a href="/aboutUs">About Us</a></li>
					<li><a href="/doctors">Doctor</a></li>
					<li><a href="/room">Room</a></li>
					<li><a href="/reviews">Reviews</a></li>
					<li><a href="/login" onClick={handleLogout}>logout</a></li>

				</ul>
			</div>
			<div class='section'>
				<div class='container'>
					<div class="title">
						<h1>About Us</h1>
					</div>
					<div class='content'>
						<div class='article'>
							<h3>We take care of your mental health</h3>
							<p>
                                Welcome to "My Psychiatrist," the app that provides personalized and accessible mental health care at your fingertips. Our mission is to make mental health care more convenient and comfortable for everyone. We believe that everyone should have access to high-quality mental health care, regardless of their location or schedule.
								Our team of licensed and experienced psychiatrists is committed to providing individualized treatment plans that cater to your unique needs and goals. We also offer convenient telemedicine services that allow you to connect with your psychiatrist from the comfort of your own home. 
                                At "My Psychiatrist," we prioritize your privacy and confidentiality, ensuring that your personal information is kept secure and confidential. We are dedicated to helping you achieve better mental health and wellness, and we are here for you every step of the way.</p>
					        <h2>You can email us at  <u>tourmanagement2001@gmail.com</u>. <></></h2>
						</div>
					</div>
					<div class="image-section">
						<img src="/images/about.jpg" alt=""></img>
					</div>
				</div>
			</div>
		</>

	)
}
export default AboutUs;