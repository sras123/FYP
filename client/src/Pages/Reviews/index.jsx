import React from "react";
import { Link} from "react-router-dom";

const Reviews=() => {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return(
        <>
        <style>
			@import url('/css/review.css');
           
		</style>

		<div class="navbar">
            <Link to="/" >
                <img src="/images/logo.png" class="logo"></img>
		    </Link>
			<ul>
				<li><a href="/aboutUs">About Us</a></li>
			    <li><a href="/contact">Contact</a></li>
			    <li><a href="/reviews">Reviews</a></li>
			    
				<li><a href="/login" onclick={handleLogout}>logout</a></li>
			</ul>  
        </div>
        
        <div class= "Reviews">
            <div class="inner">
                <h1>Client Reviews</h1>
                <div class="border"></div>
                <div class="row">
                    <div class="col">
                        <div class="Review">
                        <img src="/images/IMG_2369.JPG" alt=""></img>
                        <div class="name">Full Name</div>
                        <div class="stars">
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "far fa-star"></i>
                        </div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                    </div> 
                </div>
                <div class="col">
                        <div class="Review">
                        <img src="/images/IMG_1890.JPG" alt=""></img>
                        <div class="name">Full Name</div>
                        <div class="stars">
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "far fa-star"></i>
                            <i class= "far fa-star"></i>
                        </div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                </div> 
                </div> 
                <div class="col">
                        <div class="Review">
                        <img src="/images/IMG_1289.JPG" alt=""></img>
                        <div class="name">Full Name</div>
                        <div class="stars">
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "fas fa-star"></i>
                            <i class= "fa fa-star"></i>
                        </div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                </div> 
                </div>
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
export default Reviews;