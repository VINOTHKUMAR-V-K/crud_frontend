import React, { useRef, useState, useEffect } from 'react'
import '../style/usertable.css';
import axioxClient from '../axiosClient/axiosClient';

function UserTable() {

  const username = useRef("");
  const [data, setData] = useState([]);
  const [remo, setRemo] = useState([]);
  const [name,setName] = useState(" ");
  const [edit,setEdit] = useState([]);

  const postUser = () => {
    var payload = {
      username: username.current.value
    }
    axioxClient.post("/postName", payload)
      .then((res) => {
        console.log(res.Result);
        window.location.reload()
      })
      .catch((err) => err)
  }


  useEffect(() => {
    allUser();
  }, []);
  

  const allUser = () => {
    axioxClient.get("/getAllUsers")
      .then((res) => { setData(res.data.Result); })
      .catch((err) => err)
  }

  const deleteUser = (id) => {
    axioxClient.delete(`/deleteUserById/${id}`)
      .then((res) => {
        console.log(res.remo);
        setRemo(remo.filter(e => e.id !== id))
        window.location.reload();
      })  
      .catch((err) => err)
  }

  const updateUser = (id,NAME) => {
    setName(NAME)
    axioxClient.patch(`/updateUserById/${id}`,{ username:NAME })
    .then((res)=>{
      setEdit(res.data.Result)
      // const editData= res.data.Result
      // const editName= editData.username
      // const editId= editData._id
    })
    
    .catch((err)=>err)
  } 

  return (
    <div className='text'>
      <span>UserName : </span>
      <input type='text' placeholder='Enter a name' ref={username} value={name} onChange={(event)=>setName(event.target.value)} />
      <span><button style={{ marginLeft: '10px' }} onClick={postUser} >submit</button></span>
      <br /><br />

      <div className='ali'>
      <table>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.username}</td>
            <td>
              <button onClick={()=>updateUser(item._id,item.username)}>update</button>
              <button style={{ marginLeft: '10px' }} onClick={() => deleteUser(item._id)}> delete</button>
            </td>
          </tr>
        ))}
      </table>
      </div>

    </div>
  )
}

export default UserTable;