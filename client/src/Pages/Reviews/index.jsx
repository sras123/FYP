import React from "react";

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
			<img src="/images/logo.png" class="logo"></img>
			<ul>
				<li><a href="/aboutUs">About Us</a></li>
			    <li><a href="/contact">Contact</a></li>
			    <li><a href="/reviews">Reviews</a></li>
			    <li><a href="/signup">Signup</a></li>
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
        </>
    )
}
export default Reviews;