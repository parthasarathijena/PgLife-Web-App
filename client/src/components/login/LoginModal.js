import React, { useContext, useRef } from 'react'
import './loginModal.css'
import { Lock, Person } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext';
import { loginCall } from '../../apiCalls';
import { useNavigate } from 'react-router-dom';

function LoginModal() {
    const email = useRef();
    const password = useRef();
    const {dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const userLogin = async (e) => {
        e.preventDefault();
        await loginCall({email: email.current.value, password: password.current.value},dispatch);
        await e.target.reset();
        // window.location.reload();
        navigate(`/`);
    }
    return (
        <div className="modal fade" id="LoginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modalBox">
                <div className="modal-content loginBox">
                    <div className="modal-header loginHeader">
                        <h1 className="modal-title fs-5" id="LoginTitle">Login with PGLife</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='loginForm' onSubmit={userLogin}>
                            <div className='loginDiv'>
                                <div className='loginIconDiv'><Person className='loginIcon' /></div>
                                <input type='email' placeholder='Email' required className='loginInput' ref={email} />
                            </div>
                            <div className='loginDiv'>
                                <div className='loginIconDiv'><Lock className='loginIcon' /></div>
                                <input type='password' placeholder='Password' required minLength={6} className='loginInput' ref={password} />
                            </div>
                            <button type='submit' data-bs-dismiss="modal" className='loginButton'>Login</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <span className='footerBody'>
                            <a href='/' data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#SignupModal" className='registerLink'>Click here</a> to register a new account
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal