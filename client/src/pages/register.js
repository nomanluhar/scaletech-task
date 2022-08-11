import { useState } from "react";
import { onRegistration } from "../api/auth";
import Layout from "../components/layout";

const Register = () => {
    const [values, setValues] = useState({
        fullname: '',
        email: '',
        password: ''
    });

    const [error, setErrors] = useState(false);
    const [success, setSuccess] = useState(false);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await onRegistration(values)
            console.log(response);
            // setError('')
            // setSuccess(data.message)
            // setValues({ email: '', password: '' })
        } catch (error) {
            console.log(error);
            // setError(error.response.data.errors[0].msg)
            // setSuccess('')
        }
    }
    return (
        <Layout>
            <form onSubmit={(e) => onSubmit(e)} className='container mt-3' autoComplete="off">
                <h1>Register</h1>
                <div className='mb-3'>
                    <label htmlFor='fullname' className='form-label'>
                        Full Name
                    </label>
                    <input onChange={(e) => onChange(e)} type='text' className='form-control' id='fullname'
                        name='fullname' value={values.fullname} placeholder='John Doe' required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email address
                    </label>
                    <input onChange={(e) => onChange(e)} type='email' className='form-control' id='email'
                        name='email' value={values.email} placeholder='JohnDoe@gmail.com' required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Password
                    </label>
                    <input onChange={(e) => onChange(e)} type='password' value={values.password} className='form-control'
                        id='password' name='password' placeholder='password' required
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