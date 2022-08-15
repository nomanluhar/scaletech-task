import { useEffect, useState } from "react";
import { fetchAllContacts, onRemoveContact } from '../api/auth';

const ContactTable = () => {

    var [tableData, setTableData] = useState([]);

    const loadContact = async () => {
        const response = await fetchAllContacts();
        setTableData(response?.data?.list)
    };

    useEffect(() => {
        loadContact();
    }, []);

    const onRemove = async (e, item) => {
        try {
            if (window.confirm('Do you want to remove?')) {
                await onRemoveContact(item);
                loadContact();
            };
        } catch (error) {
            console.log(error)
        };
    };

    return (
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
                        <td></td>
                        <td><button type='button' className='btn btn-info' style={{ marginRight: "10px" }}>
                            E
                        </button><button type='button' onClick={(e) => onRemove(e, item)} className='btn btn-danger'>
                                D
                            </button></td>
                    </tr>
                )) : <tr><td>No Data Found</td></tr>}

            </tbody>
        </table>
    )

};

export default ContactTable;
// onClick={(e) => onEdit(e, item)}