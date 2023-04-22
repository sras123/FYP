import { FormControl, FormGroup, Input, InputLabel, Typography, makeStyles, Button} from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { useParams, Link, Form,useHistory } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const useStyles = makeStyles({
    container:{
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
    
});
const PostDoctor = () =>{
    const classes = useStyles();
    const [doctor_id, setDoctorId] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const history  = useHistory()
    const onChangeFile = e =>{
        setImage(e.target.files[0])
      }

    const addDoctor =async(e)=>{
        e.preventDefault()
        const token = localStorage.getItem("token")
        const url = "http://localhost:8080/doctors";

        const config = {
            headers:{
                "Content-Type" : "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try{
            const {data} = await axios.post(url, {doctor_id,title,name,price,description,image,category}, config);
            console.log(data)
            toast.success("Doctor added successfully");
            history.pushState("/adminpanel")
    
        }catch(err){
            console.log(err);
            toast.err("Failed to add")
        }
    }

   
    return(
        <form onSubmit={addDoctor}>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Post Doctor</Typography>
                <FormControl>
                    <InputLabel>Doctor ID</InputLabel>
                    <Input value={doctor_id} onChange={(e)=>setDoctorId(e.target.value)}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Title</InputLabel>
                    <Input value={title} onChange={(e)=>setTitle(e.target.value)}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input value={name} onChange={(e)=>setName(e.target.value)}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Price</InputLabel>
                    <Input value={price} onChange={(e)=>setPrice(e.target.value)}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Description</InputLabel>
                    <Input value={description} onChange={(e)=>setDescription(e.target.value)}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Content</InputLabel>
                    <Input value={content} onChange={(e)=>setContent(e.target.value)}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Images</InputLabel>
                    <Input type="file" filename="images" onChange={onChangeFile}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Input value={category} onChange={(e)=>setCategory(e.target.value)}></Input>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">Add Doctor</Button>
            </FormGroup>
        </form>
    )

}

export default PostDoctor;