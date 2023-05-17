import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";

const Reviews = () => {
    const [reviews, setReviews] = useState([])
    const history = useHistory();
    useEffect(() => {
        getReviews()

    }, [])

    const getReviews = async () => {
        const res = await axios.get('http://localhost:8080/reviews')
        console.log(res.data)
        setReviews(res.data)
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <>
            <style>
                @import url('/css/review.css');

            </style>

            <div class="navbar">
                <Link to="/" >
                    <img src="/images/logo2.png" class="logo"></img>
                </Link>
                <ul>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/doctors">Doctor</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/reviews">Reviews</a></li>

                    <li><a href="/login" onclick={handleLogout}>logout</a></li>
                </ul>
            </div>

            <div class="Reviews">
                <div class="inner">
                    <h1>Client Reviews</h1>
                    <div class="border"></div>
                    <div class="row">
                        {reviews && reviews.map((review) => {
                            return (
                                <div class="col">
                                    <div class="Review">
                                        <img src={review.images.url} alt='' />
                                        <div class="name">{review.Name}</div>
                                        <div class="stars">
                                            <div className="stars">
                                                {review.Rating === 5 && (
                                                    <>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                    </>
                                                )}
                                                {review.Rating === 4 && (
                                                    <>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </>
                                                )}
                                                {review.Rating === 3 && (
                                                    <>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </>
                                                )}
                                                {review.Rating === 2 && (
                                                    <>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </>
                                                )}
                                                {review.Rating === 1 && (
                                                    <>
                                                        <i className="fas fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <p>
                                            {review.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <Link to={'/addReview'} >
                            <button type="button"><span></span> Feedback Us</button>
                        </Link>
                    </div>

                    <div class="footer">
                        <div class="social">
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-facebook"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                        </div>
                        <ul class="list">
                            <li><a href="/aboutUs">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/reviews">Reviews</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                        <p class="Copyright">
                            @2023 My Psychiatrist
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Reviews;