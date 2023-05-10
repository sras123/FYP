import React, { useState, useEffect, Link } from 'react';
import { FormControl, FormGroup, Input, InputLabel, Typography, makeStyles, Button, Select, MenuItem } from "@material-ui/core";

import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';

const useStyles = makeStyles({
    container: {
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
    specialization: '',
    experience: '',
    hour: '',
    description: ''
}

const UpdateApplication = () => {
    const classes = useStyles();
    const [application, setApplication] = useState(intialValues);
    const { firstName, lastName, email, specialization, experience, hour, description } = application;
    const [images, setImages] = useState(true);
    const { id } = useParams();
    const history = useHistory();
    const token = localStorage.getItem("token");

    const handleUpload = async e => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            console.log(file)
            if (!file) return alert("File does not exist.")
            if (file.size > 1024 * 1024)
                return alert("Size too large!!")
            if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/webp')
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res);
            setImages(res.data)



        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editApplication = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        var decoded = decode(token)
        console.log(id)
        const url = `http://localhost:8080/psych/${id}`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        try {
            if (!images) return alert("No image upload")
            console.log(images)
            const { data } = await axios.patch(url, { ...application, images }, config);
            console.log(data)
            setImages(false)
            toast.success("updated application")
            history.push('/applyDoctor')

        } catch (err) {
            console.log(err)
            toast.error("Failed to update")
        }
    }

    const loadUserData = async (e) => {
        console.log(id)
        const response = await axios.get(`http://localhost:8080/psych/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        setApplication(response.data);
    }

    useEffect(() => {
        loadUserData();
    }, [])

    const firstNameChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "firstName": e.target.value })
    }

    const lastNameChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "lastName": e.target.value })
    }

    const emailChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "email": e.target.value })
    }


    const specilizationChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "specialization": e.target.value })
    }

    const experienceChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "experience": e.target.value })
    }

    const hourChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "hour": e.target.value })
    }

    const descriptionChange = (e) => {
        e.preventDefault()
        setApplication({ ...application, "description": e.target.value })
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
                <Link to="/adminpanel">
                    <h1>Admin Panel</h1>
                </Link>
                <ul>
                    <li><a href="/adminpanel">Users</a></li>
                    <li><a href="/category">Category</a></li>
                    <li><a href="#">Doctors</a></li>
                    <li><a href="/Applications">Applications</a></li>
                    <li><a href="/AllReviews">Reviews</a></li>
                    <li><a href="/login" onclick={handleLogout}>logout</a></li>


                </ul>
            </div>
            <form onSubmit={editApplication}>
                <FormGroup className={classes.container}>
                    <Typography variant='h4'>Edit Your Application</Typography>
                    <FormControl>
                        <InputLabel>First Name</InputLabel>
                        <Input onChange={(e) => firstNameChange(e)} name="firstName" value={firstName}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Last Name</InputLabel>
                        <Input onChange={(e) => lastNameChange(e)} name="lastName" value={lastName}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input onChange={(e) => emailChange(e)} name="email" value={email}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Specialization</InputLabel>
                        <Input onChange={(e) => specilizationChange(e)} name="specialization" value={specialization}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Experience</InputLabel>
                        <Input onChange={(e) => experienceChange(e)} name="experience" value={experience}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Hourly wage</InputLabel>
                        <Input onChange={(e) => hourChange(e)} name="hour" value={hour}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Description</InputLabel>
                        <Input onChange={(e) => descriptionChange(e)} name="description" value={description}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Image</InputLabel>
                        <Input type="file" name="file" id="file_up" onChange={handleUpload}></Input>
                        <div id="file_img" >
                            <img src={images ? images.url : ''} alt="" />
                        </div>
                    </FormControl>
                    <Button variant="contained" color="primary" type="submit">Edit Application</Button>
                </FormGroup>
            </form>
        </>
    )
}

export default UpdateApplication

