import { FormControl, FormGroup, Input, InputLabel, Typography, makeStyles, Button, Select, MenuItem } from "@material-ui/core";
import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import CategoriesAPI from "../../api/CategoriesAPI";

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
    const[doctor, setDoctor] = useState('');
    const state ={
        categoryAPI : CategoriesAPI()
    }
    const[categories] = state.categoryAPI.categories
    console.log(categories)
    const [doctor_id, setDoctorId] = useState('');
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState(true);
    const [category, setCategory] = useState('');
    const history  = useHistory()
    const token = localStorage.getItem("token");
      const handleUpload = async e => {
        e.preventDefault()
        try{
            const file = e.target.files[0]
            
            console.log(file)
            if(!file) return alert("File does not exist.")
            if(file.size>1024*1024)
                return alert("Size too large!!")
            if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp')
                return alert("File format is incorrect.")

            let formData  = new FormData()
            formData.append('file',file)

            const res = await axios.post('http://localhost:8080/upload',formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }   
            });

        console.log(res);
        setImages(res.data)
              
            

        }catch(err){
            alert(err.response.data.msg)
        }
      }

      const handleChange = (event)=>{
        setCategory(event.target.value);
      }
   /* const addDoctor =async(e)=>{
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
            history.push("/adminpanel")
    
        }catch(err){
            console.log(err);
            toast.err("Failed to add")
        }
    }*/

    const handleChangeInput  = e =>{
        const {name, value} = e.target
        setDoctor({...doctor, [name]: value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            if(!images) return alert("No Image upload")
            console.log(images)
            await axios.post("http://localhost:8080/doctors", {...doctor, images},{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            setImages(false)
            toast.success("doctor added successfully")


        }catch(err){
            alert(err.response.data.msg)
        }
    }

   
    return(
        <form onSubmit={handleSubmit}>
            <FormGroup className={classes.container}>
                <Typography variant="h4">Post Doctor</Typography>
                <FormControl>
                    <InputLabel>Doctor ID</InputLabel>
                    <Input value={doctor.doctor_id} name="doctor_id" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Title</InputLabel>
                    <Input value={doctor.title} name="title" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Name</InputLabel>
                    <Input value={doctor.name} name="name" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Price</InputLabel>
                    <Input value={doctor.price} name="price" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Description</InputLabel>
                    <Input value={doctor.description} name="description" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Content</InputLabel>
                    <Input value={doctor.content} name="content" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Image</InputLabel>
                    <Input type="file" name="file" id="file_up" onChange={handleUpload}></Input>
                    <div id="file_img" >
                        <img src={images ? images.url: ''} alt=""/>
                    </div>
                </FormControl>
                <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={doctor.category} label="category" name="category" onChange={handleChangeInput}>
  
                        {
                            categories && categories.map(category =>(
                               <MenuItem value={category._id} key={category._id}>
                                    {category.name}
                               </MenuItem> 
                            ))
                        }
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" type="submit">Add Doctor</Button>
            </FormGroup>
        </form>
    )

}

export default PostDoctor;
