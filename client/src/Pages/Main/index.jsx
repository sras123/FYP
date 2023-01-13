import styles from "./styles.module.css";
import { Link } from "react-router-dom";



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
		<header>
		<div id="menu-bar" class="fas fa-bars"></div>

		<a href="#" class="logo"> <span>My</span>Psychiatrist</a>
		<nav class="navbar">
			
			<a href="">About Us</a>
			<a href="">Contact</a>
			<a href="">Reviews</a>
			<a href="">Signup</a>
			<a href="">login</a>
			
			<Link to="/login">
		 		<button type="button" className={styles.white_btn} onClick={handleLogout}>
		 			Logout
			</button>
		 	</Link>
			
			
			
		</nav>
		</header>
	    <div className="img">
		
			<img src="./images/counsel.jpg" alt=""></img>
			<button class="btn">
				Get Started
			</button>
		</div>
		
		</>
	
	);
};

export default Main;
