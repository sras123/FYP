import React from "react";
import { Link } from "react-router-dom";

const Privacypolicy = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	return (
		<>
			<style>
				@import url('/css/contact.css');
			</style>
			<div class="navbar">
				<Link to="/" >
					<img src="/images/logo2.png" class="logo"></img>
				</Link>
				<ul>
					<li><a href="/aboutUs">About Us</a></li>
					<li><a href="/doctors">Doctors</a></li>
					<li><a href="/contact">Contact</a></li>
					<li><a href="/reviews">Reviews</a></li>

					<li><a href="/login" onclick={handleLogout}>logout</a></li>
				</ul>
			</div>

			<div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
				<h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Privacy Policy</h1>
				<p style={{ marginBottom: '1rem' }}>Last updated: 5/21/2023</p>

				<h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Welcome to My Psychiatrist!</h2>

				<p style={{ marginBottom: '1rem' }}>
					This Privacy Policy explains how we collect, use, and protect your personal information when you use our app. By using our app, you agree to the collection and use of information in accordance with this policy.
				</p>

				<h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Information We Collect</h3>

				<h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Personal Information</h4>
				<p style={{ marginBottom: '1rem' }}>
					We may collect the following types of personal information:
					<h5>Name</h5>
					<h5>Email address</h5>
					<h5>Phone number</h5>
					We collect this information when you provide it to us, such as when you create an account, make a purchase, or contact our support team.
				</p>
				<h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Contact Us</h3>
				<p style={{ marginBottom: '1rem' }}>
					If you have any questions or concerns about this privacy policy, please contact us at tourmanagement2001@gmail.com.
				</p>
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
	)
}
export default Privacypolicy;