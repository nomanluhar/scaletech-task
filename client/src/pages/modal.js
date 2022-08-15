import { useEffect, useState } from "react";
import { OnAddContact, onEditContact } from '../api/auth';

const Model = (props) => {
    var { funModalOpen, setError, setEditMode } = props;
    var defaultValue = {
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        contact_id: null
    }
    const [values, setValues] = useState(defaultValue);

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    };



    const onSubmit = async (e) => {
        e.preventDefault();
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
            protectedInfo()
        } catch (error) {
            console.log(error)
            // setError(error.response.data.errors[0].msg)
            // setSuccess('');
        };
    };

    // const onEdit = async (e, item) => {
    //     setValues(item);
    //     funModalOpen();
    //     setEditMode(true)
    // };



    return (
        <div className="modal fade show" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: "block" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add Contact</h5>
                        <button type="button" onClick={funModalOpen} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='container mt-3' autoComplete="off">
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
    );
};

export default Model;