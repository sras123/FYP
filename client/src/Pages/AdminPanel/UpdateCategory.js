import React,{useState, useEffect} from 'react';
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
    name: ''
}

const UpdateCategory = () => {
    const classes = useStyles();
    const [category, setCategory] = useState(intialValues);
    const {name} = category;
    const {id} = useParams();
    const history = useHistory();

    const editCategory = async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token")
        var decoded = decode(token)
        console.log(id)
        const url = `http://localhost:8080/category/${id}`;

        const config = {
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try{
            const {data} = await axios.patch(url, category, config);
            console.log(data)
            toast.success("updated category")
            history.push('/category')
        }catch(err){
            console.log(err)
            toast.error("Failed to update")
        }
    }

    const loadUserData = async(e)=>{
        console.log(id)
        const response = await axios.get(`http://localhost:8080/category/${id}`, {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})
        setCategory(response.data);
    }

    useEffect(()=>{
        loadUserData();
    },[])

    const nameChange = (e)=>{
        e.preventDefault()
        setCategory({...category,"name":e.target.value})
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
    <form onSubmit={editCategory}>
        <FormGroup className={classes.container}>
            <Typography variant='h4'>Edit Category</Typography>
            <FormControl>
                <InputLabel >Category Type</InputLabel>
               <Input onChange={(e) => nameChange(e)} name="name" value={name}></Input>
            </FormControl>
            <Button variant="contained" color="primary" type="submit">Edit Category</Button>
        </FormGroup>
        </form>
    </>
  )
}

export default UpdateCategory