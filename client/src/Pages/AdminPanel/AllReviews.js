import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, makeStyles, Button } from "@material-ui/core";
import axios from "axios";
import { Link, useParams, useHistory } from 'react-router-dom';
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
const AllReviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const classes = useStyles();
    const [refresh, setRefresh] = useState(false);
    const token = localStorage.getItem("token")
    const getData = async (e) => {
        const res = await fetch(
            "http://localhost:8080/reviews",
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
            setReviews(data);
            console.log(reviews);
        }
    };

    useEffect(() => {
        getData()
    }, [refresh]);

    const deleteReviewData = async (id) => {
        const url = `http://localhost:8080/reviews/${id}`;
        const res = await axios.delete(
            url,
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
        );

        toast.success("Reviews deleted successfully")
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
                    <li><a href="/allDoctors">Psychiatrists</a></li>
                    <li><a href="/Applications">Applications</a></li>
                    <li><a href="/AllReviews">Reviews</a></li>
                    <li><a href="/login" onclick={handleLogout}>logout</a></li>


                </ul>
            </div>
            <Table className={classes.table}>
                <TableHead >
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Ratings</TableCell>
                        <TableCell>Images</TableCell>
                        <TableCell>Functionality</TableCell>
                    </TableRow>
                </TableHead>


                <TableBody>
                    {
                        reviews && reviews.map((review) => {
                            return (
                                <TableRow className={classes.row} key={review._id}>
                                    <TableCell>{review._id}</TableCell>
                                    <TableCell>{review.Name}</TableCell>
                                    <TableCell>{review.description}</TableCell>
                                    <TableCell>{review.Rating}</TableCell>
                                    <TableCell><img src={review.images.url} style={{ height: 300, width: 200 }}></img></TableCell>
                                    <TableCell>
                                        {/* <Button variant="contained" color="primary" style={{ margin: 10 }} component={Link} to={`/updateReview/${review._id}`}>Edit</Button> */}
                                        <Button variant="contained" color="secondary" onClick={() => deleteReviewData(review._id)}>Delete</Button>
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

export default AllReviews;