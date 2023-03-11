import { useState } from "react";
import axios from "axios";
import {useHistory, Link } from "react-router-dom";
import {toast} from "react-toastify";
import styles from "./styles.module.css";
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Signup = () => {
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: ""
	});
	const history= useHistory();
	const [error, setError] = useState("");
	

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:8080/register";
            const { data: res } = await axios.post(url, data);
            const message = res;
            toast(`${message}`)
            history.push("/login");
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message ??
                error.message ??
                'Internal server error.');
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            },3000);

        }
    };

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Login
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
							<input
							type="password"
							placeholder="confirmPassword"
							name="confirmPassword"
							onChange={handleChange}
							value={data.confirmPassword}
							required
							className={styles.input}
						/>

							<input
							type="text"
							placeholder="role e.g.patient"
							name="role"
							onChange={handleChange}
							value={data.role}
							className={styles.input}
						/>
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