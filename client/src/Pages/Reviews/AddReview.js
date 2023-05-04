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
const AddReview=()=>{
    const classes = useStyles();
    const [Name,setName] = useState('');
    const [description,setDescription] = useState('')
    const [Rating,setRating] = useState(0)
    const [images, setImages] = useState(true);
    const [review,setReview] = useState('')
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
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }   
            });

        console.log(res);
        setImages(res.data)
              
            

        }catch(err){
            alert(err.response.data.msg)
        }
      }
      const handleChangeInput  = e =>{
        const {name, value} = e.target
        setReview({...review, [name]: value})
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try{
            if(!images) return alert("No Image upload")
            console.log(images)
            await axios.post("http://localhost:8080/addReviews", {...review, images},{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            setImages(false)
            toast.success("review added successfully")


        }catch(err){
            alert(err.response.data.msg)
        }
    }
    return  (
        <form onSubmit={handleSubmit}>
            <FormGroup className={classes.container} >
                <Typography variant="h4">Add review</Typography>
                <FormControl>
                    <InputLabel>Full Name</InputLabel>
                    <Input  name="Name"onChange={handleChangeInput} ></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Description</InputLabel>
                    <Input  name="description" onChange={handleChangeInput}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel>Rating</InputLabel>
                    <Input name="Rating" onChange={handleChangeInput}></Input>
                </FormControl>
            
                <FormControl>
                    <InputLabel>Image</InputLabel>
                    <Input type="file" name="file" id="file_up" onChange={handleUpload}></Input>
                    <div id="file_img" >
                        <img src={images ? images.url: ''} alt=""/>
                    </div>
                </FormControl>
            
                <Button variant="contained" color="primary" type="submit">Add Review</Button>
            </FormGroup>
        </form>
    )
}

export default AddReview