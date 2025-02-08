import React , { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

const Home = () => {

    const navigate = useNavigate();
    const [render , setRender] = useState(false);
    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}/getuser`;

    const ADD_URL = `${process.env.REACT_APP_BASE_URL}/addurl`;
    const [inputData , setInputData] = useState({ longUrl : ''});

    const READ_URL = `${process.env.REACT_APP_BASE_URL}/readurl`;
    const [urlData , seturlData] = useState([]);

    const DELETE_URL = `${process.env.REACT_APP_BASE_URL}/deleteurl`;

    const LOGOUT_URL = `${process.env.REACT_APP_BASE_URL}/logout`;



    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(GETUSER_URL , {
                method : 'GET',
                credentials : 'include'
            });
            const responded = await response.json();
            if(responded.Result === true){
                
            }else{
                navigate('/login');
            }
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);
    useEffect(() => {
        const getUrls = async () => {
            const response = await fetch(READ_URL , {
                method : 'GET',
                credentials : 'include'
            });
            const responded = await response.json();
            if(responded.Result === true){
                seturlData(responded.data);
            }else{
                
            }
        }
        getUrls();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [render]);



    const handleChange = (e) => {
        const { name , value } = e.target;
        setInputData({ ...inputData , [name] : value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch( ADD_URL , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
            credentials: 'include',
        });
        const responded = await response.json();
        
        if(responded.Result === true){
            setRender(!render);
            setInputData({ longUrl : '' });
            toast.success( responded.Message, {
                position : 'top-center',
                autoClose: 1000
            });
        }else {
            toast.error(responded.Message || 'Something went wrong! Please try again.', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
    }


    const handleDelete = async (Id) => {
        const response = await fetch( `${DELETE_URL}/${Id}` , {
            method: 'DELETE',
            credentials: 'include',
        });
        const responded = await response.json();
        if(responded.Result === true){
          setRender(!render);
          toast.success( responded.Message, {
              position : 'top-center',
              autoClose: 1000
          });
          
        }else{
          toast.success( responded.Message || 'Something went wrong! Please try again.', {
              position : 'top-center',
              autoClose: 1000
          });
        }
    }


    const handleLogout = async () => {
        const response = await fetch(LOGOUT_URL , {
            method : 'POST',
            credentials : 'include'
        });
        const responded = await response.json();
        if(responded.Result === true){
            navigate('/login');
        }
    }

    const handleCopy = async (url) => {
        navigator.clipboard.writeText(url)
        .then(() => {
            toast.success( 'URL Copied!', {
                position : 'top-center',
                autoClose: 1000
            });
        })
        .catch(err => {
            toast.success( err.message, {
                position : 'top-center',
                autoClose: 1000
            });
        });
    }
    const handleRedirect = async (url) => {
        window.open(url, '_blank');
    }

    



  return (
    <div>
        <div className="container" style={{marginTop: '50px' , position: 'relative'}}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="input-group">
                        
                        <input type="text" className="form-control" placeholder="Enter URL" id="longUrl" name='longUrl' value={inputData.longUrl || ''} required onChange={ (e) => handleChange(e)}/>

                        
                        <div className="input-group-append ps-5">
                            <button className="btn btn-primary" type="button" id="addButton" onClick={(e) => {handleSubmit(e)}}>Add</button>
                        </div>
                        
                        <button className="btn btn-danger mx-4" type="button" id="logout" onClick={(e) => {handleLogout(e)}}>LogOut</button>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-4">
            <div className="col-md-8">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Long URL</th>
                            <th scope="col">Short URL</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            urlData && urlData.length > 0 ? 

                            urlData.map((item , index) => {
                                return(
                                    <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.longUrl}</td>
                                        <td>{`${process.env.REACT_APP_BASE_URL}/${item.shortUrl}`}</td>
                                        <td>
                                            <button className="btn btn-success" onClick={() => handleCopy(`${process.env.REACT_APP_BASE_URL}/${item.shortUrl}`)} >
                                                Copy
                                            </button>
                                            <button className="btn btn-info mx-2" onClick={() => handleRedirect(`${process.env.REACT_APP_BASE_URL}/${item.shortUrl}`)} >
                                                Redirect
                                            </button>
                                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(item._id)} >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td colSpan={6} className='text-center'>No Data Available</td>
                            </tr>
                        }
                        
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Home