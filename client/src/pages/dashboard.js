import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchProtectedInfo, OnAddContact, onLogout, fetchAllContacts, onEditContact, onRemoveContact } from '../api/auth'
import Layout from '../components/layout'
import { unauthenticateUser } from '../redux/slices/authSlice'

const Dashboard = () => {
    const dispatch = useDispatch();
    var [tableData, setTableData] = useState([])
    var [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true)
    const [protectedData, setProtectedData] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isEditMode, setEditMode] = useState(false);
    var defaultValue = {
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        contact_id: null
    }
    const [values, setValues] = useState(defaultValue);

    const funModalOpen = () => setModalOpen(!modalOpen)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const logout = async () => {
        try {
            await onLogout()
            dispatch(unauthenticateUser());
            localStorage.removeItem('isAuth');
        } catch (error) {
            console.log(error)
        }
    }

    const protectedInfo = async () => {
        try {
            const { data } = await fetchProtectedInfo();
            setProtectedData(data.info)
            console.log(protectedData)
            setLoading(false);
            const response = await fetchAllContacts();
            setTableData(response?.data?.list)

        } catch (error) {
            logout()
        };
    };

    useEffect(() => {
        protectedInfo()
    }, []);

    const addFun = () => {
        // setValues(defaultValue);
        funModalOpen();
        setEditMode(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const { status } = await fetchProtectedInfo();
        if (status && status == 200) {
            try {
                values['currentUserEmail'] = localStorage.getItem('currentUserEmail');
                if (!isEditMode) {
                    var { data } = await OnAddContact(values)
                } else {
                    var { data } = await onEditContact(values)
                }
                setError('');
                setSuccess(data.message)
                funModalOpen();
                setValues(defaultValue);
                setEditMode(false);
                protectedInfo();
            } catch (error) {
                console.log(error)
                setError(error.response.data.errors[0].msg)
                setSuccess('');
            };
        } else {
            console.log('Auth Failed');
            logout();
        };
    };

    const onEdit = async (e, item) => {
        setValues(item);
        funModalOpen();
        setEditMode(true)
    };

    const onRemove = async (e, item) => {
        const { status } = await fetchProtectedInfo();
        if (window.confirm('Do you want to remove?')) {
            try {
                if (status && status == 200) {
                    var { data } = await onRemoveContact(item);
                    setError('');
                    setSuccess(data.message);
                    setValues(defaultValue);
                    protectedInfo();
                } else {
                    console.log('Auth Failed');
                    logout();
                };
            } catch (error) {
                console.log(error)
                setError(error.response.data.errors[0].msg);
                setSuccess('');
            };
        };
    };

    return loading ? (
        <Layout>
            <h1>Loading...</h1>
        </Layout>
    ) : (
        <div>
            <Layout>
                <h1>Contact List</h1>
                {/* <h2>{protectedData}</h2> */}
                <button type="button" className="btn btn-primary" onClick={funModalOpen}>Add</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.length ? tableData.map((item, i) => (
                            <tr key={i}>
                                <td>{item.contact_name}</td>
                                <td>{item.contact_email}</td>
                                <td>{item.contact_phone}</td>
                                <td><button type='button' onClick={(e) => onEdit(e, item)} className='btn btn-primary mr-2'>
                                    E
                                </button><button type='button' onClick={(e) => onRemove(e, item)} className='btn btn-danger'>
                                        D
                                    </button></td>
                            </tr>
                        )) : <tr><td>No Data Found</td></tr>}

                    </tbody>
                </table>
                <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
                <div style={{ color: 'green', margin: '10px 0' }}>{success}</div>
                {/* modal code */}
                {modalOpen &&
                    <div className="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Contact</h5>
                                    <button type="button" onClick={addFun} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e) => onSubmit(e)} className='container mt-3' autoComplete="off">
                                        <div className='mb-3'>
                                            <label htmlFor='contact_name' className='form-label'>
                                                Full Name
                                            </label>
                                            <input onChange={(e) => onChange(e)} type='text' className='form-control' id='contact_name'
                                                name='contact_name' placeholder='John Doe' value={values.contact_name} required
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='contact_email' className='form-label'>
                                                Email
                                            </label>
                                            <input onChange={(e) => onChange(e)} type='email' className='form-control' id='contact_email'
                                                name='contact_email' placeholder='JohnDoe@gmail.com' value={values.contact_email} required
                                            />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor='contact_phone' className='form-label'>
                                                Phone number
                                            </label>
                                            <input onChange={(e) => onChange(e)} type='number' className='form-control'
                                                id='contact_phone' name='contact_phone' placeholder='phone number' value={values.contact_phone} required
                                            />
                                        </div>


                                        <button type='submit' className='btn btn-primary'>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <button onClick={() => logout()} className='btn btn-primary'>Logout </button>
            </Layout>
        </div>
    );
};

export default Dashboard; 