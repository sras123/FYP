import React, { useState, useEffect, Link } from 'react';
import { FormControl, FormGroup, Input, InputLabel, Typography, makeStyles, Button, Select, MenuItem } from "@material-ui/core";

import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import CategoriesAPI from "../../api/CategoriesAPI";
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
    name: '',
    title: '',
    price: '',
    content: '',
    description: '',
    category: ''
}

const UpdateDoctor = () => {
    const classes = useStyles();
    const state = {
        categoryAPI: CategoriesAPI()
    }
    const [categories] = state.categoryAPI.categories
    const [category, setCategory] = useState(intialValues);
    const { name, title, content, price, description, categoryName } = category;
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

    const editDoctor = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token")
        var decoded = decode(token)
        console.log(id)
        const url = `http://localhost:8080/doctors/${id}`;

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${`localStorage.getItem("token")}`}`,
            }
        }

        try {
            if (!images) return alert("No image upload")
            console.log(images)
            const { data } = await axios.patch(url, { ...category, images }, config);
            console.log(data)
            setImages(false)
            toast.success("updated doctor")
            history.push('/allDoctors')

        } catch (err) {
            console.log(err)
            toast.error("Failed to update")
        }
    }

    const loadUserData = async (e) => {
        console.log(id)
        const response = await axios.get(`http://localhost:8080/doctors/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        setCategory(response.data);
    }

    useEffect(() => {
        loadUserData();
    }, [])

    const nameChange = (e) => {
        e.preventDefault()
        setCategory({ ...category, "name": e.target.value })
    }

    const titleChange = (e) => {
        e.preventDefault()
        setCategory({ ...category, "title": e.target.value })
    }

    const priceChange = (e) => {
        e.preventDefault()
        setCategory({ ...category, "price": e.target.value })
    }


    const contentChange = (e) => {
        e.preventDefault()
        setCategory({ ...category, "content": e.target.value })
    }

    const descChange = (e) => {
        e.preventDefault()
        setCategory({ ...category, "description": e.target.value })
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleChangeInput = e => {
        const { name, value } = e.target
        setCategory({ ...category, [name]: value })
    }
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
            <form onSubmit={editDoctor}>
                <FormGroup className={classes.container}>
                    <Typography variant='h4'>Edit Doctor</Typography>
                    <FormControl>
                        <InputLabel>Name</InputLabel>
                        <Input onChange={(e) => nameChange(e)} name="name" value={name}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Title</InputLabel>
                        <Input onChange={(e) => titleChange(e)} name="title" value={title}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Price</InputLabel>
                        <Input onChange={(e) => priceChange(e)} name="price" value={price}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Content</InputLabel>
                        <Input onChange={(e) => contentChange(e)} name="content" value={content}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Image</InputLabel>
                        <Input type="file" name="file" id="file_up" onChange={handleUpload}></Input>
                        <div id="file_img" >
                            <img src={images ? images.url : ''} alt="" />
                        </div>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Description</InputLabel>
                        <Input onChange={(e) => descChange(e)} name="description" value={description}></Input>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Category</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" onChange={handleChangeInput} value={categoryName} label="category" name="category" >

                            {
                                categories && categories.map(category => (
                                    <MenuItem value={category.name} key={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>


                    <Button variant="contained" color="primary" type="submit">Edit Category</Button>
                </FormGroup>
            </form>
        </>
    )
}

export default UpdateDoctor

