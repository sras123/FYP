import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	makeStyles,
	Button,
  } from "@material-ui/core";
  import axios from "axios";
  import {Link, useParams} from 'react-router-dom';
  import { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import decode from 'jwt-decode';

  
const useStyles = makeStyles({
	table: {
	  width: "90%",
	  margin: "50px 0 0 50px",
	},
	thead: {
	  "& > *": {
		background: "#000000",
		color: "#ffffff",
		fontSize: 20,
	  },
	},
	row: {
	  "& > *": {
		fontSize: 20,
	  },
	},
  });

const AdminPanel=() => {
	const{id} = useParams();
	const [users, setUsers] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
	const token = localStorage.getItem("token")
	var decoded = decode(token);
	console.log(id)
    const getData = async (e) =>{
		const res = await fetch(
			"http://localhost:8080/allUser",
			{ headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}},
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		const data = await res.json();

		if (res.status === 404 || !data) {
			console.log("error ");
		  } else {
			setUsers(data.data);
			console.log(users);
		  }
	};

	useEffect(() => {
		getData();
	  }, [refresh]);
	  
	const deleteUserData = async(id) =>{
		const url = `http://localhost:8080/${decoded._id}/deleteUser/${id}`;
		const res = await axios.delete(
			url,
			{headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}},

		);

		toast.success("User deleted Successfully")
		setRefresh(!refresh)
	};
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
    return(
        <>
        <style>
			@import url('/css/adminpanel.css');
		</style>
		
		<div class="navbar">
			<h1>Admin Panel</h1>
			<ul>
				<li><a href="/adminpanel">Users</a></li>
			    <li><a href="/contact">Reviews</a></li>
			    <li><a href="/reviews">Appoint</a></li>
			    <li><a href="/signup">Therapy</a></li>
				<li><a href="/login" onclick={handleLogout}>logout</a></li>
				
			
			</ul>
		</div>
      

		<Table className={classes.table}>
			<TableHead>
				<TableRow className={classes.thead}>
					<TableCell>Id</TableCell>
					<TableCell>FirstName</TableCell>
					<TableCell>LastName</TableCell>
					<TableCell>Email</TableCell>
					<TableCell>Role</TableCell>
					<TableCell>Functionality</TableCell>
				</TableRow>
			</TableHead>

			<TableBody>
				{users.map((user)=>(
					<TableRow className={classes.row} key={user._id}>
						<TableCell>{user._id}</TableCell>
						<TableCell>{user.firstName}</TableCell>
						<TableCell>{user.lastName}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell>
							<Button variant="contained" color="primary" style={{margin:10}} component={Link} to={`/updateUser/${user._id}`}>Edit</Button>
							<Button variant="contained" color="secondary" onClick={() => deleteUserData(user._id)}>Delete</Button>
							<Button variant="contained" color="primary" style={{margin:10}} component={Link}>Add User</Button>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>

	
        <div class="footer">
			<div class="social">
				<a href="#"><i class="fab fa-instagram"></i></a>
				<a href="#"><i class="fab fa-facebook"></i></a>
				<a href="#"><i class="fab fa-twitter"></i></a>
			</div>
			<ul class="list">
				<li><a href="/allusers">Users</a></li>
			    <li><a href="/reviews">Review</a></li>
			    <li><a href="/appoint">Appointment</a></li>
				<li><a href="/therapy">Therapy</a></li>
			</ul>
		</div>


        </>

    )
}
export default AdminPanel;