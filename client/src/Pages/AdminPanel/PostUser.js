import React,{useEffect, useState} from 'react'
import { FormControl, FormGroup, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core'
import { useHistory, Link} from 'react-router-dom';
import axios from 'axios';
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

const PostUser = () => {
    const classes = useStyles();
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
	const [email, setEmail] = useState('');
	const [password , setPassword] = useState('');
	const [confirmPassword, setcPassword] = useState('');
	const [role, setRole] = useState('');	
    const history = useHistory();
    

    const registerPsych= async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("token")
        const url = "http://localhost:8080/addPsych";

        const config = {
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }

        try{
            console.log("hi")
            const {data} = await axios.post(url,{firstName,lastName,email,password,confirmPassword,role},config);
            console.log(data)
            toast.success("Psychologist register successfully");
            history.push("/adminpanel")
        }catch(err){
            console.log(err)
            toast.error("Failed to register")
        }
        
    }

   
  
	
  return (
    <form onSubmit={registerPsych}>
    <FormGroup className={classes.container}>
        <Typography variant='h4'>Post Psychologist</Typography>
        <FormControl>
            <InputLabel>FirstName</InputLabel>
           <Input value={firstName} onChange={(e)=> setfirstName(e.target.value)}></Input>
        </FormControl>
        <FormControl>
            <InputLabel>LastName</InputLabel>
           <Input value={lastName} onChange={(e)=> setlastName(e.target.value)}></Input>
        </FormControl>
        <FormControl>
            <InputLabel>email</InputLabel>
           <Input value={email} onChange={(e)=>setEmail(e.target.value)}></Input>
        </FormControl>
        <FormControl>
            <InputLabel>Password</InputLabel>
           <Input value={password} onChange={(e)=> setPassword(e.target.value)}></Input>
        </FormControl>
        <FormControl>
            <InputLabel>ConfirmPassword</InputLabel>
           <Input value={confirmPassword} onChange={(e)=> setcPassword(e.target.value)}></Input>
        </FormControl>
        <FormControl>
            <InputLabel>Role</InputLabel>
           <Input value={role} onChange={(e)=>setRole(e.target.value)}></Input>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">Post User</Button>
    </FormGroup>
    </form>
  )
}

export default PostUser