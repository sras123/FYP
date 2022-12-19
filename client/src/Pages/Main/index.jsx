import styles from "./styles.module.css";
import { Link } from "react-router-dom";


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>My Psychiatrist</h1>
				<Link to="/login">
				<button type="button" className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				</Link>
			</nav>
		</div>
	);
};

export default Main;
