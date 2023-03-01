import React from "react";

const BookingPage=() => {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return(
        <>
        <style>
			@import url('/css/book.css');
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
        <div class= "Booking">
            <div class="inner">
                <h1>Book your Psychiatrist</h1>
                <div class="border"></div>
                <div class="row">
                    <div class="col">
                        <div class="Book">
                        <img src="/images/IMG_2369.JPG" alt=""></img>
                        <div class="name">Full Name</div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div>
				           <button type="button"><span></span> Book Now </button>
			           </div>
                    </div> 
                </div>
                <div class="col">
                        <div class="Book">
                        <img src="/images/IMG_1890.JPG" alt=""></img>
                        <div class="name">Full Name</div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div>
				           <button type="button"><span></span> Book Now </button>
			           </div>
                </div> 
                </div> 
                <div class="col">
                        <div class="Book">
                        <img src="/images/IMG_1289.JPG" alt=""></img>
                        <div class="name">Full Name</div>
                        <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div>
				           <button type="button"><span></span> Book Now </button>
			           </div>
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
export default BookingPage;