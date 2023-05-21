import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import { Link, useParams , useHistory} from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useStyles = makeStyles({
    table: {
        width: "90%",
        margin: "50px 0 0 50px",
    },
    thead: {
        "& > *": {
            background: "#000000",
            color: "#ffffff",
            fontSize: 20,
        },
    },
    row: {
        "& > *": {
            fontSize: 20,
        },
    },
});
const Category = () => {
    const [categories, setCategory] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token")
    const getData = async (e) => {
        const res = await fetch(
            "http://localhost:8080/doctorCategory",
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            },
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await res.json();
        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setCategory(data);
            console.log(categories);
        }
    };

    useEffect(() => {
        getData()
    }, [refresh]);

    const deleteCategoryData = async (id) => {
        const url = `http://localhost:8080/category/${id}`;
        const res = await axios.delete(
            url,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
        );

        toast.success("Category deleted successfully")
        setRefresh(!refresh)
    }

    const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
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
                    <li><a href="/alldoctors">Psychiatrists</a></li>
                    <li><a href="/Applications">Applications</a></li>
                    <li><a href="/AllReviews">Reviews</a></li>
                    <li><a href="/login" onClick={handleLogout}>logout</a></li>


                </ul>
            </div>
            <Table className={classes.table}>
                <TableHead >
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Functionality</TableCell>
                        <TableCell><Button variant="contained" color="primary" style={{ margin: 10 }} component={Link} to={'/postCategory'}>Add Category</Button></TableCell>
                    </TableRow>

                </TableHead>


                <TableBody>
                    {
                        categories && categories.map((category) => {
                            return (
                                <TableRow className={classes.row} key={category._id}>
                                    <TableCell>{category._id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" style={{ margin: 10 }} component={Link} to={`/updateCategory/${category._id}`}>Edit</Button>
                                        <Button variant="contained" color="secondary" onClick={() => deleteCategoryData(category._id)}>Delete</Button>
                                        {/* <Button variant="contained" color="primary" style={{margin:10}} component={Link} to={'/postCategory'}>Add Category</Button> */}
                                    </TableCell>
                                </TableRow>
                            );

                        })
                    }

                </TableBody>
            </Table>
        </>
    )
}

export default Category;