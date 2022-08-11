import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";

const Register = () => {
    const [values, setValues] = useState({
        user_name: '',
        user_email: '',
        user_password: ''
    });

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await onRegistration(values)
            setError('');
            setSuccess(data.message)
            setValues({ user_name: '', user_email: '', user_password: '' })
        } catch (error) {
            console.log(error)
            setError(error.response.data.errors[0].msg)
            setSuccess('');
        }
    }
    return (
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3' autoComplete="off">
                <h1>Register</h1>
                <div className='mb-3'>
                    <label htmlFor='user_name' className='form-label'>
                        Full Name
                    </label>
                    <input onChange={(e) => onChange(e)} type='text' className='form-control' id='user_name'
                        name='user_name' value={values.user_name} placeholder='John Doe' required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='user_email' className='form-label'>
                        Email address
                    </label>
                    <input onChange={(e) => onChange(e)} type='user_email' className='form-control' id='user_email'
                        name='user_email' value={values.user_email} placeholder='JohnDoe@gmail.com' required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='user_password' className='form-label'>
                        Password
                    </label>
                    <input onChange={(e) => onChange(e)} type='user_password' value={values.user_password} className='form-control'
                        id='user_password' name='user_password' placeholder='Password' required
                    />
                </div>
                <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
                <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </Layout>
    )
};

export default Register;