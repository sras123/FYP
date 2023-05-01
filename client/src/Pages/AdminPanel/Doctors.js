import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button} from "@material-ui/core";
import axios from "axios";
import {Link, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

const Doctors = () => {
    const {id} = useParams();
    const [doctors, setDoctor] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token")
    const getData = async (e) =>{
        const res = await fetch(
            "http://localhost:8080/doctors",{
                headers: {Authorization: `Bearer ${token}`}
            },
            {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                },
            }
        );
        const data = await res.json();
        if(res.status === 404 || !data){
            console.log("error");
        }else{
            setDoctor(data.doctors);
            console.log(data.doctors)
        }
    };

    const deleteDoctor = async(id)=>{
        const url = `http://localhost:8080/doctors/${id}`;
        const res = await axios.delete(
            url,
            {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}},
        );

        toast.success("Doctor deleted successfully")
        setRefresh(!refresh)
    }
        

    useEffect(()=>{
        getData()
    },[refresh])

    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  return (
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
        <TableHead >
            <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>DoctorId</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Functionality</TableCell>
            <TableCell><Button variant="contained" color="primary" style={{margin:10}} component={Link}to={'/postDoctor'}>Add Doctor</Button></TableCell>
            </TableRow>
        </TableHead>
    

    <TableBody>
    {
                doctors && doctors.map((doctor)=>{
                    return (
                    <TableRow className={classes.row} >
                        <TableCell>{doctor._id}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{doctor.title}</TableCell>
                        <TableCell>{doctor.name}</TableCell>
                        <TableCell>{doctor.price}</TableCell>
                        <TableCell>{doctor.description}</TableCell>
                        <TableCell>{doctor.content}</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{doctor.category}</TableCell> 
                       
                        <TableCell>
                            <Button variant="contained" color="primary" style={{margin:10}} component={Link}to={`/updateDoctor/${doctor._id}`}>Edit</Button>
                            <Button variant="contained" color="secondary" onClick={()=> deleteDoctor(doctor._id)}>Delete</Button>
                            {/* <Button variant="contained" color="primary" style={{margin:10}} component={Link}to={'/postDoctor'}>Add Doctor</Button> */}
                        </TableCell>
                    </TableRow>
                    )
                })
            }
                
       
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

export default Doctors
