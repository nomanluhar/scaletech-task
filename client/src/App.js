import { BrowserRouter, Navigate, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import Verify from './pages/verify'
import Login from './pages/login';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>


        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>

        {/* <Route>
          <Route path='/verify/:emailId' element={<Verify />} />
        </Route> */}


      </Routes>
    </BrowserRouter>
  )
};

export default App;  