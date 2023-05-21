import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button} from "@material-ui/core";
import axios from "axios";
import {Link, useParams,useHistory} from 'react-router-dom';
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

const Applications = () => {
    const [applications, setApplication] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token")
    const getData = async (e) =>{
        const res = await fetch(
            "http://localhost:8080/psych",{
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
            setApplication(data);
            console.log(applications)
        }
    };

    useEffect(()=>{
        getData()
    }, [refresh]);

    const deleteApplication = async(id) =>{
        const url = `http://localhost:8080/psych/${id}`;
        const res = await axios.delete(
            url,
        );
        toast.success("Application deleted successfully")
        setRefresh(!refresh)
    }

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
                    <li><a href="/alldoctors">Psychiatrists</a></li>
                    <li><a href="/Applications">Applications</a></li>
                    <li><a href="/AllReviews">Reviews</a></li>
                    <li><a href="/login" onClick={handleLogout}>logout</a></li>


                </ul>
    </div>
    <Table className={classes.table}>
        <TableHead >
            <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>FirstName</TableCell>
            <TableCell>LastName</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Specialization</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Hourly Wage</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Images</TableCell>
            <TableCell>Functionality</TableCell>
            </TableRow>
        </TableHead>
    

    <TableBody>
    {
                applications && applications.map((application)=>{
                    return (
                    <TableRow className={classes.row} >
                        <TableCell>{application._id}</TableCell>
                        <TableCell>{application.firstName}</TableCell>
                        <TableCell>{application.lastName}</TableCell>
                        <TableCell>{application.email}</TableCell>
                        <TableCell>{application.specialization}</TableCell>
                        <TableCell>{application.experience}</TableCell>
                        <TableCell>{application.hour}</TableCell>
                        <TableCell>{application.description}</TableCell>
                        <TableCell><a href={application.images.url} target='_blank'><img src={application.images.url} style={{height: 200, width: 200}} alt='images'/> </a></TableCell> 
                        <TableCell>
                            {/* <Button variant="contained" color="primary"style={{margin:10}} component={Link} to={`/updateApplication/${application._id}`}>Edit</Button> */}
                            <Button variant="contained" color="secondary" onClick={()=> deleteApplication(application._id)} >Delete</Button>
                            <Button variant="contained" color="primary" component={Link} to={'/postUser'}>Approve</Button>

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

export default Applications
