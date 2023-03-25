import React, { useState,useEffect } from 'react';
import {FormControl, FormGroup, InputLabel,Input,Button,makeStyles, Typography} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    container:{
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
    
});

const intialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}

const UpdatUser = () => {
    const classes = useStyles();
    const [user, setUser] = useState(intialValues);
    const{firstName,lastName,email,password} = user;
    const {id} = useParams();
    const history = useHistory();

    const editUser= async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token")
        var decoded = decode(token);
        console.log(id);
        const url = `http://localhost:8080/${decoded._id}/updateUser/${id}`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
        }

        try{
            const {data} = await axios.patch(url,user,config);
            console.log(data)
            toast.success("user updated")
            history.push('/adminpanel')      
        }catch(err){
            console.log(err)
            toast.error("Failed to Update")
        }
    }

    const loadUserData = async(e)=>{
        console.log(id)
        const response = await axios.get(`http://localhost:8080/user/${id}`, {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        setUser(response.data);
    }

    useEffect(()=>{
        loadUserData();
    },[])

    const firstNameChange = (e)=>{
        e.preventDefault()
        setUser({...user,"firstName":e.target.value})
    }

    const lastNameChange = (e)=>{
        e.preventDefault()
        setUser({...user,"lastName":e.target.value})
    }

    const emailChange = (e)=>{
        e.preventDefault()
        setUser({...user,"email":e.target.value})
    }

    const passwordChange = (e)=>{
        e.preventDefault()
        setUser({...user,"password":e.target.value})
    }

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
    <form onSubmit={editUser}>
        <FormGroup className={classes.container}>
            <Typography variant='h4'>Edit User</Typography>
            <FormControl>
                <InputLabel>First Name</InputLabel>
               <Input onChange={(e)=> firstNameChange(e)} name='firrstName' value={firstName}></Input>
            </FormControl>
            <FormControl>
                <InputLabel>Last Name</InputLabel>
               <Input onChange={(e)=> lastNameChange(e)} name='lastName' value={lastName}></Input>
            </FormControl>
            <FormControl>
                <InputLabel>Email</InputLabel>
               <Input onChange={(e)=> emailChange(e)} name='email' value={email}></Input>
            </FormControl>
            <FormControl>
                <InputLabel>Password</InputLabel>
               <Input onChange={(e)=> passwordChange(e)} name='password' value={password}></Input>
            </FormControl>
            <Button variant="contained" color="primary" type="submit">Edit User</Button>
        </FormGroup>
        </form>
        </>
  )
}

export default UpdatUser;


