import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});
	// const history= useHistory();
	const [error, setError] = useState("");
	const[msg, setMsg]= useState("");


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
			// history.push("/login");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;




// import { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./styles.module.css";
// import {toast, ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getAuth, sendSignInLinkToEmail } from "firebase/auth";


// const Signup = () => {
// 	// const [username, setUname] = useState('');
// 	const [email, setEmail] = useState('');
// 	// const [password , setPassword] = useState('');
// 	// const[error, setError] = useState('');
	
//     const handleSubmit= async (e) => {
// 		e.preventDefault();
//         const config= {
// 			url: "process.env.REACT_APP_REGISTER_REDIRECT_URL",
// 			handleCodeInApp: true,
// 		};

//         const auth= getAuth();
// 		sendSignInLinkToEmail(auth, email, config);
// 		toast.success(
// 			`Email is sent to ${email}. Click the link to complete your registration.`
// 		);
	
// 	//save user email in local storage
//     window.localStorage.setItem("emailForSignIn", email);
// 	//clear state
// 	setEmail("");
// 	};

//     return (
// 		<div className={styles.signup_container}>
// 			<div className={styles.signup_form_container}>
// 				<div className={styles.left}>
// 					<h1>Welcome Back</h1>
// 					<Link to="/login">
// 						<button type="button" className={styles.white_btn}>
// 							Sign in
// 						</button>
// 					</Link>
// 				</div>
// 				<div className={styles.right}>
// 					<form className={styles.form_container} onSubmit={handleSubmit}>
// 						<h1>Create Account</h1>
// 						<ToastContainer/>
// 						{/* <input
// 							type="text"
// 							placeholder="UserName"
// 							onChange={(e) => setUname(e.target.value)}
// 							value={username}
// 							required
// 							className={styles.input}
// 							autoFocus
// 						/> */}
// 						<input
// 							type="email"
// 							placeholder="Email"
// 							onChange={(e) => setEmail(e.target.value)}
// 							value={email}
// 							required
// 							className={styles.input}
// 							autoFocus
// 						/>
// 						{/* <input
// 							type="password"
// 							placeholder="Password"
// 							onChange={(e) => setPassword(e.target.value)}
// 							value={password}
// 							required
// 							className={styles.input}
// 						/> */}
// 						<button type="submit" className={styles.green_btn}>
// 							Sign Up
// 						</button>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Signup;