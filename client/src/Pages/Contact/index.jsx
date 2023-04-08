import React from "react";
import {Link} from "react-router-dom";


const Contact=() => {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return(
        <>
        <style>
			@import url('/css/contact.css');
		</style>
		
		<div class="navbar">
		<Link to="/" >
                <img src="/images/logo.png" class="logo"></img>
		    </Link>
			<ul>
				<li><a href="/aboutUs">About Us</a></li>
			    <li><a href="/contact">Contact</a></li>
			    <li><a href="/reviews">Reviews</a></li>
			    <li><a href="/signup">Signup</a></li>
				<li><a href="/login" onclick={handleLogout}>logout</a></li>
				
			
			</ul>
		</div>


		<div class="container">
		<div class="contact-box">
			
			<div class="right">
				<h2>Contact Us</h2>
				<input type="text" class="field" placeholder="Your Name"></input>
				<input type="text" class="field" placeholder="Your Email"></input>
				<input type="text" class="field" placeholder="Phone"></input>
				<textarea placeholder="Message" class="field"></textarea>
				<button class="btn">Send</button>
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

    )
}
export default Contact;