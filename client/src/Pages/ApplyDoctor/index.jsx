import React from "react";
import { Link, useNagivate } from "react-router-dom";
// import{userSelector, useDispatch} from 'react-redux';
// import {showLoading, hideLoading} from '../../redux/features/alertSlice'
// import axios from 'axios'
 
const ApplyDoctor = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();

        // const { user } = userSelector(state => state.user)
        // const dispatch = useDispatch()
        // const navigate = useNagivate()
        // //handle form
        // const handleFinish = async (values) => {
        //     try {
        //         dispatch(showLoading())
        //         const res= await axios.post('/v1/user/apply-doctor', {...values},{ userId:user._id},{
        //             headers:{
        //                 Authorization : `Bearer ${localStorage.getItem("token")}`
        //             }
        //         })
        //         dispatch(hideLoading())
        //         if (res.data.success){
        //             message.success(res.data.success)
        //             navigate('/')
        //         }else{
        //             message.error(res.data.success) 
        //         }
        //     } catch (error) {
        //         console.log(error)
        //         message.error('Something went wrong')
        //     }
        // }
    };
    return (
        <>
            <style>
                @import url('/css/apply.css');
            </style>

            <div class="navbar">
                <Link to="/" >
                    <img src="/images/logo.png" class="logo"></img>
                </Link>
                <ul>
                    <li><a href="/aboutUs">About Us</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/reviews">Reviews</a></li>
                    <li><a href="/signup">Signup</a></li>
                    <li><a href="/login" onclick={handleLogout}>logout</a></li>


                </ul>
            </div>


            <div class="container">
                <div class="contact-box">

                    <div class="right">
                        <h2>Apply as Psychiatrist</h2><br />
                        <h3>Give Your Personal Details:</h3>
                        <input type="text" class="field" placeholder="First Name"></input>
                        <input type="text" class="field" placeholder="Last Email"></input>
                        <input type="email" class="field" placeholder="Email"></input><br />
                        <h3>Professional Details:</h3>
                        <input type="text" class="field" placeholder="Your Specialization"></input>
                        <input type="text" class="field" placeholder="Experience"></input>
                        <input type="number" class="field" placeholder="How much you charge per hr"></input>
                        <input type="text" class="field" placeholder="Your Specialization"></input>
                        <textarea placeholder="Message" class="field" ></textarea>
                        <button class="btn" type="submit">Submit</button>
                    </div>
                </div>
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
        </>

    )
}
export default ApplyDoctor;