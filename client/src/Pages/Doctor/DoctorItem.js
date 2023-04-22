import React from 'react';
import { Link } from 'react-router-dom';

function DoctorItem({doctor}) {
  return (
  <div className='doctor_card'>
     <img src={doctor.images.url} alt=""/>

<div className="doctor_box">
    <h2 title={doctor.title}>{doctor.title}</h2>
    <h3>{doctor.name}</h3>
    <span>${doctor.price}</span>
    <h6>{doctor.description}</h6>
    <p>{doctor.content}</p>
</div>

<div className='row_btn'>
        <Link id='btn_appoint'>Appoint</Link>
        <Link id='btn_view' to={`/detailDoctor/${doctor._id}`}>View</Link>
        </div>

  </div>

  )
}

export default DoctorItem