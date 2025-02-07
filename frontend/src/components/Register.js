import React , { useState , useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import '../component_css/Login.css'

const Register = () => {

    const navigate = useNavigate();
    const GETUSER_URL = `${process.env.REACT_APP_BASE_URL}/getuser`;

    const SIGNIN_URL = `${process.env.REACT_APP_BASE_URL}/signin`;
    const [inputData , setInputData] = useState({ userEmail : '' , userPassword : ''});

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(GETUSER_URL , {
                method : 'GET',
                credentials : 'include'
            });
            const responded = await response.json();
            if(responded.Result === true){
                navigate('/home');
            }else{
                navigate('/');
            }
        }
        getUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , []);




    const handleChange = (e) => {
        const { name , value } = e.target;
        setInputData({ ...inputData , [name] : value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch( SIGNIN_URL , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData),
        });
        const responded = await response.json();
        
        if(responded.Result === true){
            setInputData({ userEmail : '' , userPassword : '' });
            toast.success( responded.Message, {
                position : 'top-center',
                autoClose: 1000,
                onClose: () => {
                    navigate('/login');
                }
            });
        }else {
            toast.error(responded.Message || 'Something went wrong! Please try again.', {
                position: 'top-center',
                autoClose: 1000,
            });
        }
    }

  return (
    <div>
        <div className="container">
            <div className="login-container">
                <h2>Register</h2>
                <form>
                    
                    <div className="form-group">
                        <label htmlFor="userEmail">Username</label>
                        <input type="text" className="form-control" id="userEmail" name='userEmail' placeholder="Enter username" required value={inputData.userEmail} onChange={ (e) => handleChange(e)}/>
                    </div>

                    
                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input type="password" className="form-control" id="userPassword" name='userPassword' placeholder="Enter password" required value={inputData.userPassword} onChange={ (e) => handleChange(e)}/>
                    </div>

                    
                    <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>Register</button>

                    
                    <div className="text-center mt-3">
                        <Link to={'/login'} className='btn text-decoration-underline'>Already Registered</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register