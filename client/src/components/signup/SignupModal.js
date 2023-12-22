import React, { useRef } from 'react'
import './signupModal.css'
import { AccountBalance, Email, Lock, Person, Phone } from '@mui/icons-material'

function SignupModal() {
    const name = useRef();
    const phone = useRef();
    const email = useRef();
    const password = useRef();
    const college = useRef();
    let gender;

    const register = async (e) => {
        e.preventDefault();
        const user = {
            name: name.current.value,
            phone: phone.current.value,
            email: email.current.value,
            password: password.current.value,
            college: college.current.value,
            gender: gender,
        }

        try {
            const res = await fetch('https://pglife-web-app.onrender.com/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (res.status === 200)
                window.alert('User Register')
            else
                window.alert('User Not Register')
            await e.target.reset();

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="modal fade" id="SignupModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modalBox">
                <div className="modal-content signupBox">
                    <div className="modal-header signupHeader">
                        <h1 className="modal-title fs-5" id="SignupTitle">Signup with PGLife</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='signupForm' onSubmit={register}>
                            <div className='signupDiv'>
                                <div className='signupIconDiv'><Person className='signupIcon' /></div>
                                <input placeholder='Full Name' required className='signupInput' ref={name} />
                            </div>
                            <div className='signupDiv'>
                                <div className='signupIconDiv'><Phone className='signupIcon' /></div>
                                <input placeholder='Phone Number' required minLength={10} maxLength={10} className='signupInput' ref={phone} />
                            </div>
                            <div className='signupDiv'>
                                <div className='signupIconDiv'><Email className='signupIcon' /></div>
                                <input type='email' placeholder='email' required className='signupInput' ref={email} />
                            </div>
                            <div className='signupDiv'>
                                <div className='signupIconDiv'><Lock className='signupIcon' /></div>
                                <input type='password' placeholder='Password' required minLength={6} className='signupInput' ref={password} />
                            </div>
                            <div className='signupDiv'>
                                <div className='signupIconDiv'><AccountBalance className='signupIcon' /></div>
                                <input placeholder='College Name' required minLength={6} className='signupInput' ref={college} />
                            </div>
                            <div className='signupDiv genderOption' >
                                <span>I'm a</span>
                                <span>
                                    <input type="radio" required id="male" name="gender" value="1" onClick={event => { gender = event.target.value }}/>
                                    <label htmlFor="male"> Male </label>
                                </span>
                                <span>
                                    <input type="radio" id="female" name="gender" value="2" onClick={event => { gender = event.target.value }}/>
                                    <label htmlFor="female"> Female </label>
                                </span>
                            </div>
                            <button type='submit' className='signupButton' >Create Account</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <span className='footerBody'>
                            Already have an account? <a href='/' data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#LoginModal" className='loginLink'>Login</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupModal