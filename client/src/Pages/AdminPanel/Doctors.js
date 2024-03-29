import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import { Link, useParams, useHistory } from 'react-router-dom';
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
    const [doctors, setDoctor] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token")
    const getData = async (e) => {
        const res = await fetch(
            "http://localhost:8080/doctors", {
            headers: { Authorization: `Bearer ${token}` }
        },
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        const data = await res.json();
        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setDoctor(data.doctors);
            console.log(data.doctors)
        }
    };

    const deleteDoctor = async (id) => {
        const url = `http://localhost:8080/doctors/${id}`;
        const res = await axios.delete(
            url,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
        );

        toast.success("Doctor deleted successfully")
        setRefresh(!refresh)
    }


    useEffect(() => {
        getData()
    }, [refresh])

    const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};

    return (
        <>
            <style>
                @import url('/css/adminpanel.css');
            </style>

            <div class="navbar">
                <Link to="/adminpanel">
                    <h1>Admin Panel</h1>
                </Link>
                <ul>
                    <li><a href="/adminpanel">Users</a></li>
                    <li><a href="/category">Category</a></li>
                    <li><a href="/allDoctors">Psychiatrists</a></li>
                    <li><a href="/Applications">Applications</a></li>
                    <li><a href="/AllReviews">Reviews</a></li>
                    <li><a href="/login" onClick={handleLogout}>logout</a></li>


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
                        <TableCell><Button variant="contained" color="primary" style={{ margin: 10 }} component={Link} to={'/postDoctor'}>Add Psychiatrist</Button></TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {
                        doctors && doctors.map((doctor) => {
                            return (
                                <TableRow className={classes.row} >
                                    <TableCell>{doctor._id}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>{doctor.title}</TableCell>
                                    <TableCell>{doctor.name}</TableCell>
                                    <TableCell>{doctor.price}</TableCell>
                                    <TableCell>{doctor.description}</TableCell>
                                    <TableCell>{doctor.content}</TableCell>
                                    <TableCell><a href={doctor.images.url} ><img src ={doctor.images.url} style={{width:"200px",height:"300px"}}alt="doctor-image"/></a></TableCell>
                                    <TableCell>{doctor.category}</TableCell>

                                    <TableCell>
                                        <Button variant="contained" color="primary" style={{ margin: 10 }} component={Link} to={`/updateDoctor/${doctor._id}`}>Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteDoctor(doctor._id)}>Delete</Button>
                                        {/* <Button variant="contained" color="primary" style={{margin:10}} component={Link}to={'/postDoctor'}>Add Doctor</Button> */}
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }


                </TableBody>
            </Table>

          
        </>
    )
}

export default Doctors
