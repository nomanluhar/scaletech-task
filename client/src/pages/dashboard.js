import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, onLogout } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Dashboard = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [protectedData, setProtectedData] = useState(null)

    const logout = async () => {
        try {
            await onLogout()
            console.log(unauthenticateUser())
            dispatch(unauthenticateUser())
            localStorage.removeItem('isAuth')
        } catch (error) {
            console.log(error)
        }
    }

    const protectedInfo = async () => {
        try {
            console.log('1')
            const { data } = await fetchProtectedInfo()
            console.log(data)
            setProtectedData(data.info)

            setLoading(false)
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        protectedInfo()
    }, [])

    return loading ? (
        <Layout>
            <h1>Loading...</h1>
        </Layout>
    ) : (
        <div>
            <Layout>
                <h1>Dashboard</h1>
                <h2>{protectedData}</h2>

                <button onClick={() => logout()} className='btn btn-primary'>Logout </button>
            </Layout>
        </div>
    );
};

export default Dashboard;