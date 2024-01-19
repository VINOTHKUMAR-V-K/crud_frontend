import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const CheckOut = (props) => {
    //rzp_test_X2J6MLpYvRxg1E-key
    //BxARInPrDSqj3WCVLH1COEiu-secret
    let navigate=useNavigate();
    const [total,setTotal]=useState(props.amount)
     
    const handlePay=(e)=>{
       e.preventDefault();
       if(total===0 || ""){
        alert("please select the items")
       }else{
        var options={
          key:"rzp_test_X2J6MLpYvRxg1E",
          key_secret:"BxARInPrDSqj3WCVLH1COEiu",
          amount:total*100,
          currency:"INR",
          name:"Food Delivery Demo",
          description:"for testing purpose",
          handler:function(response){
            alert(response.razorpay_payment_id)
            window.location.reload();
          },
          profill:{
            name:'vinoth',
            email:'vinothkumarmmu@gmail.com',
            contact:'6379430500'
          },
          notes:{
            address:"Razorpay Corporate"
          },
          theme:{
            color:"#3399cc"
          }
        };
        var pay =new window.Razorpay(options);
        pay.open()
       }  
       
    }

  return (
    <div>
        <form >
        <h1 className='fw-bold'>PAYMENT</h1>
        <hr />
        <h1 style={{color:'rgb(255, 69, 0)'}} value={total} onChange={e=>setTotal(e.target.value)}>Total:  &#8377;{props.amount}</h1>
        <button className='btn btn-outline-danger' onClick={handlePay}>pay</button>

        </form>
    </div>
  )
}
