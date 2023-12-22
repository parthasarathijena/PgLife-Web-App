import React from 'react'
import './topbar.css'
import { Login, Logout, Person, PostAdd } from '@mui/icons-material'
import LoginModal from '../login/LoginModal'
import SignupModal from '../signup/SignupModal'
import Cookies from 'js-cookie';
import PostModal from '../post/PostModal'
import { useNavigate } from 'react-router-dom'


function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();
  const logoutHandle = ()=>{
    Cookies.remove('user');
    navigate('/')
  }
  let content;
  if (Cookies.get('user') === undefined)
    content = (<div className='topbarRight'>
      <div className='topbarSignup'>
        <span className='topbarText'>
          <button type="button" className="btn topbarButton" data-bs-toggle="modal" data-bs-target="#SignupModal">
            <Person className='topbarMaterial' />
            Signup
          </button>
        </span>
      </div>
      <div className='topbarLogin'>
        <span className='topbarText'>
          <button type="button" className="btn topbarButton" data-bs-toggle="modal" data-bs-target="#LoginModal">
            <Login className='topbarMaterial' />
            Login
          </button>
        </span>
      </div>
      <SignupModal />
      <LoginModal />
    </div>)
  else
    content = (<div className='topbarRight'>
      <div className='topbarSignup'>
        <span className='topbarText'>
          <button type="button" className="btn topbarButton" data-bs-toggle="modal" data-bs-target="#PostModal">
            <PostAdd className='topbarMaterial' />
            Post
          </button>
        </span>
      </div>
      <div className='topbarLogin'>
        <span className='topbarText'>
          <button type="button" className="btn topbarButton" onClick={logoutHandle}>
            <Logout className='topbarMaterial' />
            LogOut
          </button>
        </span>
      </div>
      <PostModal />
    </div>)
  return (
    <div className='topbar'>
      <div className='topbarWrapper'>
        <div className='topbarLeft'>
          <img className='topbarLogo' src={`${PF}/innerImg/logo.png`} alt='' onClick={()=>navigate('/')}/>
        </div>
        {content}
      </div>
    </div>
  )
}

export default Topbar