import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import decode from 'jwt-decode';
import UserAPI from '../../api/UserAPI';
const URL = "http://localhost:8080/doctors"



function Doctor() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const refreshToken = async () => {
    const res = await axios.get('http://localhost:8080/login')
    setToken(res.token)
  }

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if (firstLogin) refreshToken()
    refreshToken();
  }, [])
  const state = {
    token: [token, setToken],
    userAPI: UserAPI(token)
  }
  const handleLogout = () => {
    console.log("from handle logout")
    localStorage.removeItem("token");
    window.location.reload();
  };
  const [doctors, setDoctors] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const addAppointment = state.userAPI.addAppointment
  const totalAppointment = state.userAPI.totalAppointment
  useEffect(() => {
    const getDoctors = async () => {
      const res = await axios.get(URL)
      setDoctors(res.data.doctors)
      console.log(doctors)
    }
    getDoctors()

  }, [refresh]);

  useEffect(() => {
    console.log("from doctor.js", token);
  }, [token])

  return (
    <>
      <style>
        @import url('/css/nav.css');
      </style>
      <div class="navbar">
        <Link to="/" >
          <img src="/images/logo.png" class="logo"></img>
        </Link>
        <ul>
          <li><a href="/aboutUs">About Us</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/reviews">Reviews</a></li>
          
          <li><a href="/login" onclick={handleLogout}>logout</a></li>
        </ul>
        <div className="cart-icon">
          <span>{totalAppointment}</span>
          <Link to="/appoint"><i class="fa-solid fa-user-doctor"></i></Link>
        </div>
      </div>


      <div className="doctors">
        {doctors && doctors.map((doctor) => (


          <div className="doctor_card">
            <img src={doctor.images.url} alt='' />
            <div className='doctor_box'>
              <h2>{doctor.title}</h2>
              <h3>{doctor.name}</h3>
              <span className='price'>Rs. {doctor.price}</span>
              <h6>{doctor.description}</h6>
              <p>{doctor.content}</p>
            </div>
            <div className='row_btn'>
              <Link id='btn_appoint' to="#" onClick={() => addAppointment(doctor)}>Appoint</Link>
              <Link id='btn_view' to={`/detailDoctor/${doctor._id}`}>View</Link>
            </div>
          </div>
        ))
        }
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

export default Doctor