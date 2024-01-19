import React, { useEffect, useState } from 'react'
import '../styles/detail.css';
import { ImageSlider } from './ImageSlider';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import Modal from 'react-modal';
import queryString from 'query-string';
// import axios from 'axios';
import { CheckOut } from './CheckOut';
import axiosClient from '../axiosClient';




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgb(192, 192, 192)',
        textAlign: 'center',
        borderRadius: '10px 10px 10px 10px'
    }
};

const DetatilPage = () => {

    const [resturant, setResturant] = useState([]);
    const [gallaryIsOpen, setGallaryIsOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [count, setCount] = useState({});
    const [paymentModal, setPaymentModal] = useState(false)
    const parsed = queryString.parse(window.location.search);
    const id = parsed.resturant;

    useEffect(() => {
        

        axiosClient.get(`/zomoto/restById/${id}`)
            .then((res) => {
                setResturant(res.data);
            })

        axiosClient.get(`/zomoto/menu/${resturant.name}`)
            .then((res) => {
                setMenu(res.data);
            })
    }, [resturant.name])


    const gallaryOpen = () => {
        setGallaryIsOpen(true);
        axiosClient.get(`/zomoto/menu/${resturant.name}`)
            .then((res) => {
                setMenu(res.data);
            })
    }

    const handleIncrement = (selectItem, index) => {

        if (selectItem) {
            setCount((pre) => {
                const newCount = { ...pre, [index]: (pre[index] || 0) + 1 };
                setQuantity(pre => parseFloat(pre + selectItem.price))
                return newCount
            })
        }
    };

    const paymentIsOpen = () => {
        setGallaryIsOpen(false);
        setPaymentModal(true);
    }

    const handleDecrement = (selectItem, index) => {

        if (selectItem && quantity > 0 && count[index] > 0) {

            setCount(pre => {
                const newCount = { ...pre, [index]: pre[index] - 1 };
                setQuantity(pre => pre - selectItem.price);
                return newCount
            })
        }
    };
    const cashOnDelivery = () => {
        setGallaryIsOpen(false);
        alert("Order Accepted.. wait for few minutes...")
    }

    return (
        <div>
            <div className='border border-5 rounded-3 detail'>
                <div className='rounded-3 slider'>
                    <ImageSlider />
                    <br />
                    <div className='d-flex justify-content-between'>
                        <h1 className='line text-start'>{resturant.name}</h1>
                        <button className='btn-outline-danger bttn' onClick={gallaryOpen}>Place Order</button>
                    </div>
                  </div>
                <div className='border border-2 rounded-3'>
                    <Tabs>
                        <TabList className="d-flex flex-row">
                            <Tab style={{ backgroundColor: "aqua" }}><h3 style={{ color: "red" }}>Overview</h3></Tab>
                            <Tab style={{ backgroundColor: "aqua" }}><h3 style={{ color: "red" }}>Contact</h3></Tab>
                        </TabList>
                        <TabPanel>
                            <h3 style={{ color: "orange", fontWeight: "bolder" }} >Overview:</h3>
                            <h6 style={{ width: "50%", margin: "auto" }}>Previous Next
                                View Larger Image
                                The restaurant industry is one of the largest components of the hospitality industry and is focused on providing food services where customers are able to order food and eat it on the premises
                                <br />
                                <h5>{`Ratting : ${resturant.rating_text}`}</h5>
                                <h5>{`City: ${resturant.city}`}</h5>
                            </h6>
                        </TabPanel>
                        <TabPanel>
                            <h3 style={{ color: "orange", fontWeight: "bolder" }}>Phone number</h3>
                            <h6>{resturant.contact_number}</h6>
                            <br />
                            <h3 style={{ color: "orange", fontWeight: "bolder" }}>{resturant.name}</h3>
                            <h6>{resturant.locality}</h6>
                        </TabPanel>
                    </Tabs>
                    <br />
                </div>
            </div>
            <br /><br />

            <Modal isOpen={gallaryIsOpen} style={customStyles}>
                {menu.map(e => {
                    return <div>
                        <h1 style={{ color: 'rgb(128, 0, 0)' }} className='fw-bold'>{e.name.toUpperCase()}</h1>
                        <hr className='foods' />
                        <div style={{ backgroundColor: 'rgba(0,0,0,0.80)', width: '100%', borderRadius: '8px' }}>

                            <div >
                                {e.item.map((a, index) =>
                                (
                                    <span className='d-flex justify-content-between p-2' key={index}>
                                        <p style={{ color: 'rgb(0, 255, 127)', fontSize: '13px' }} className='px-4 fst-italic'>
                                             <h3 style={{ color: 'rgb(255, 69, 0)' }} className='fw-bold'>{a.name}</h3> 
                                             {a.desc}  
                                        </p>
                                        <div className='d-flex justify-content-evenly px-4' style={{ width: '180px', border: 'none' }}>
                                            <button className='btn btn-outline-warning fs-6 fw-bold' onClick={() => handleDecrement(a, index)}>-</button>
                                            <button className='fw-bold fs-6 text-center btn btn-outline-success'>{count[index] || 0}</button>
                                            <button className='btn btn-outline-warning fs-6 fw-bold' onClick={() => handleIncrement(a, index)}>+</button>
                                        </div>
                                        <h4 className='py-3' style={{ color: 'rgb(255, 69, 0)' }}>&#8377; {a.price}</h4>
                                    </span>
                                )
                                )}
                            </div>
                        </div>
                        <hr />
                        <h1 style={{ color: 'black', marginLeft: "40%" }} className='px-3 py-1'>SubTotal: &#8377; {quantity || e.amount}</h1>
                        <div className='d-flex justify-content-end '>
                            <button className='btn btn-outline-success fs-5 fw-bold' onClick={paymentIsOpen}>pay Online</button>
                            <button className='btn btn-outline-success fs-5 fw-bold mx-2' onClick={cashOnDelivery} >Cash On Delivery</button>
                        </div>
                    </div>
                }
                )}
            </Modal>
            <Modal isOpen={paymentModal} style={customStyles}>
                <CheckOut amount={quantity} id={id} />
            </Modal>

        </div>
    )
}

export default DetatilPage