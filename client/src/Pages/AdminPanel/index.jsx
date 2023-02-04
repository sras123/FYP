import React from "react";
// import styles from "./styles.module.css";

const AdminPanel=() => {
    return(
        <>
        <style>
        @import url('/css/adminpanel.css');
        </style>
        <div class="navbar">
        <h1>Admin Panel</h1>
        <nav><ul>
            <li> <a href="/home">Home</a></li>
            <li><a href="/contact">Contact</a></li>
            <li> <a href="">About Us</a></li>
            <li><a href="">Help</a></li>
            </ul></nav>
            <button class="btn" type="submit">Sign Up</button>
        </div>
        
        </>
    )
}



export default AdminPanel;