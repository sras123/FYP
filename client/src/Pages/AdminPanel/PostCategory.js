import { FormControl, FormGroup, Input, InputLabel, Typography, makeStyles, Button } from '@material-ui/core';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';

const useStyles = makeStyles({
  container:{
      width: '50%',
      margin: '5% 0 0 25%',
      '& > *': {
          marginTop: 20
      }
  }

});
const PostCategory=()=> {
  const classes = useStyles();
  const[name, setName] = useState('');
  const history = useHistory()

  const addCategory = async(e)=>{
    e.preventDefault()
    const token = localStorage.getItem("token")
    const url = "http://localhost:8080/doctorCategory";

    const config = {
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }

    try{
      const {data} = await axios.post(url, {name}, config);
      console.log(data)
      toast.success("Doctor category added successfully");
      history.push("/category")
    }catch(err){
      console.log(err);
      toast.err("Failed to add")
    }
  }
  return (
   <form onSubmit={addCategory}>
    <FormGroup className={classes.container}>
      <Typography variant="h4">Post Category</Typography>
      <FormControl>
        <InputLabel>Category Type</InputLabel>
        <Input value={name} onChange={(e)=>setName(e.target.value)}></Input>
      </FormControl>
      <Button variant="contained" color="primary" type='submit'>Add Category</Button> 
    </FormGroup>
   </form>
  )
}

export default PostCategory