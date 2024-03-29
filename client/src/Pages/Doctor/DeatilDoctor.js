import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import DoctorAPI from '../../api/DoctorAPI';
import DoctorItem from './DoctorItem';
import UserAPI from '../../api/UserAPI';
import axios from 'axios';

function DetailDoctor() {
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
  const history = useHistory()
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/login");
	};
  const state = {
    doctorsAPI: DoctorAPI(),
    userAPI: UserAPI(token)
  }
  const params = useParams()
  const [doctors] = state.doctorsAPI.doctors
  const addAppointment = state.userAPI.addAppointment
  const totalAppointment = state.userAPI.totalAppointment
  console.log(doctors)
  const [detailDoctor, setDetailDoctor] = useState([])
  useEffect(() => {
    if (params) {
      doctors.forEach(doctor => {
        console.log(doctor);
        if (doctor._id === params.id) setDetailDoctor(doctor)
        console.log(params)
      })
    }

  }, [params, doctors])

  console.log(detailDoctor)
  if (detailDoctor.length === 0) return null;

  return (
    <>
      <style>
        @import url('/css/nav.css');
      </style>
      <div class="navbar">
      <Link to="/" >
          <img src="/images/logo2.png" class="logo"></img>
        </Link>
        <ul>
          <li><a href="/aboutUs">About Us</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/room">Room</a></li>
          <li><a href="/reviews">Reviews</a></li>
          <li><a href="/login" onclick={handleLogout}>logout</a></li>
        </ul>
        <div className="cart-icon">
          <span>{totalAppointment}</span> 
        
          <Link to="/appoint"><i class="fa-solid fa-user-doctor"></i></Link>
        </div>
      </div>
      <div className="detail">
        <img src={detailDoctor.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailDoctor.title}</h2>
            <h3>{detailDoctor.name}</h3>
            <h6>#id: {detailDoctor.doctor_id}</h6>
          </div>
          <span> Rs. {detailDoctor.price}</span>
          <p>{detailDoctor.description}</p>
          <p>{detailDoctor.content}</p>
          <p>Available: {detailDoctor.available}</p>


          <Link to="#" onClick={() => addAppointment(detailDoctor)} className="cart">Appoint</Link>
        </div>
      </div>

      <div>
        <h2>Other Doctors</h2>
        <div className="doctors">
          {
            doctors.map(doctor => {
              return doctor.category === detailDoctor.category
                ? <DoctorItem key={doctor._id} doctor={doctor} /> : null

            })
          }
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
			    <li><a href="/reviews">Reviews</a></li>
					<li><a href="/privacypolicy">Privacy Policy</a></li>
			</ul>
			<p class="Copyright">
			@2023 My Psychiatrist
			</p>
		</div>
    </>
  )
}

export default DetailDoctor