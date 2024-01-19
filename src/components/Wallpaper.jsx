import React, { useEffect, useState } from 'react'
import "../styles/wallpaper.css";
import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
import axiosClient from '../axiosClient';


const Wallpaper = () => {
    const naviagte = useNavigate();
    const [location, setLocation] = useState([]);
    const [rest, setRest] = useState([]);
    const [inputtext, setInputtext] = useState('');
    const [locationid, setLocationid] = useState([]);
    const [suggestion, setSuggestion] = useState([]);
    const [fill, setFill] = useState([]);
    
    const fetchLocation = () => {
        axiosClient.get('/zomoto/getAllLocations')
            .then((res) => setLocation(res.data))
            .catch((err) => console.log(err))
    }
    const fetchRest = () => {
        axiosClient.get(`/zomoto/getAllRest`)
            .then((res) => setRest(res.data))
    }
    useEffect(() => {
        sessionStorage.clear();
        fetchLocation();
        fetchRest();

    }, []);

    const handleLocationChange = (e) => {
        let locationId = e.target.value;  
        const [value1,value2]=locationId.split(",")
        sessionStorage.setItem("city",value2)    
        sessionStorage.setItem("locationID",Number(value1))
        
        axiosClient.get(`/zomoto/restByLocationId/${value1}`)
            .then((res) => {
                setLocationid(res.data);
            })
        axiosClient.get(`/zomoto/restBycity/${value2}`)
            .then((res) => setFill(res.data));  
       
    }
  
    const handleSearch = (e) => {
        let inputText = e.target.value;
        const suggestions = rest.filter(e => e.name.toLowerCase().includes(inputText.toLowerCase()));
        setInputtext(inputText);
        setSuggestion(suggestions)
    }
    const selectingRest = (restObj) => {
        naviagte(`/detail?resturant=${restObj._id}`);
    }
    const showSuggestion = () => {
        if (suggestion.length == 0 && inputtext == undefined) {
            return null;
        }
        if (suggestion.length > 0 && inputtext == '') {
            return null;
        }
        if (suggestion.length == 0 && inputtext) {
            return <ul>
                <li>No Serach Result found</li>
            </ul>
        }
        return (
            <ul>
                {suggestion.map((e, i) => (<li key={i} onClick={() => selectingRest(e)} >{`${e.name}- ${e.locality},${e.city}  `}</li>)) }
            </ul>
        )
    }
    return (
        <div>
            <div className='bgimg '>
                <div className='d-flex flex-column  text-center justify-content-end"'>
                    <div className='logo' style={{ marginLeft: "45%" }}>VK</div>
                    <h1 className='find'>Find Your Best Hotels in your Area</h1>
                    <div className='px-2'>
                                <select id='cities' placeholder='select city' onChange={handleLocationChange}>
                                <option>--select city--</option>
                                {location.map((loc, index) => {
                            return <option key={index} id={loc.city} value={`${loc.location_id},${loc.city}`}>{`${loc.name}, ${loc.city}`}</option>    
                                }) }
                                </select>
                        <span id='input'>
                            <input type="search" className='border rounded-3 px-4 mx-2' placeholder='Serach Hotels' onChange={handleSearch} />
                            {showSuggestion()}
                        </span>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Wallpaper