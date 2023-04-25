import { useState, useEffect } from "react";
import axios from 'axios';

function DoctorAPI(){
    const[doctors, setDoctors] = useState([])

    useEffect(()=>{
        const getDoctors = async()=>{
            const res = await axios.get('http://localhost:8080/doctors')
            setDoctors(res.data.doctors)
        }

        getDoctors()
    },[])

    return{
        doctors: [doctors, setDoctors]
    }
}

export default DoctorAPI