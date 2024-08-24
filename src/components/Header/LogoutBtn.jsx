import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const logoutHandler = () => {
      setLoading(true);
        authService.logout().then(() => {
            dispatch(logout());
            navigate('/login');
        }).catch(console.error()).finally(() => setLoading(false)
        );      
    }
    return (
      loading ? (
          <button
              className='px-6 py-2 duration-200 hover:bg-blue-100 rounded-full flex items-center justify-center'
              disabled
          >
              <div className='animate-spin border-t-2 border-b-2 border-blue-500 border-solid rounded-full h-5 w-5 mr-3'></div>
              Logging Out...
          </button>
      ) : (
          <button
              className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
              onClick={logoutHandler}
          >
              Logout
          </button>
      )
  );
  
    
}

export default LogoutBtn