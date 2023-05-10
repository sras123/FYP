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
    Name: '',
    description: '',
    Rating: ''
}

const UpdateReview = () => {
    const classes = useStyles();
    const [review, setReview] = useState(intialValues);
    const { Name, description, Rating } = review;
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

    const editReview = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        var decoded = decode(token)
        console.log(id)
        const url = `http://localhost:8080/reviews/${id}`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        try {
            if (!images) return alert("No image upload")
            console.log(images)
            const { data } = await axios.patch(url, { ...review, images }, config);
            console.log(data)
            setImages(false)
            toast.success("updated your review")
            history.push('/reviews')

        } catch (err) {
            console.log(err)
            toast.error("Failed to update")
        }
    }

    const loadUserData = async (e) => {
        console.log(id)
        const response = await axios.get(`http://localhost:8080/reviews/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        setReview(response.data);
    }

    useEffect(() => {
        loadUserData();
    }, [])

    const nameChange = (e) => {
        e.preventDefault()
        setReview({ ...review, "Name": e.target.value })
    }

    const descChange = (e) => {
        e.preventDefault()
        setReview({ ...review, "description": e.target.value })
    }

    const ratingChange = (e) => {
        e.preventDefault()
        setReview({ ...review, "Rating": e.target.value })
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
            <form onSubmit={editReview}>
                <FormGroup className={classes.container}>
                    <Typography variant='h4'>Edit Review</Typography>
                    <FormControl>
                        <InputLabel>Full Name</InputLabel>
                        <Input onChange={(e) => nameChange(e)} name="Name" value={Name}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Description</InputLabel>
                        <Input onChange={(e) => descChange(e)} name="description" value={description}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Rating</InputLabel>
                        <Input onChange={(e) => ratingChange(e)} name="Rating" value={Rating}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Image</InputLabel>
                        <Input type="file" name="file" id="file_up" onChange={handleUpload}></Input>
                        <div id="file_img" >
                            <img src={images ? images.url : ''} alt="" />
                        </div>
                    </FormControl>

                    <Button variant="contained" color="primary" type="submit">Edit Review</Button>
                </FormGroup>
            </form>
        </>
    )
}

export default UpdateReview

