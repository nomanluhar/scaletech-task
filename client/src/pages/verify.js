import { useLocation, NavLink,useParams } from "react-router-dom";
import { useEffect } from "react";
import { userValidation } from "../api/auth";

const Verify = () => {
    const urlParams = useLocation();
    const t = useParams();
    console.log({t})
    const emailValidate = async () => {
        try {
            const response = await userValidation(urlParams);
            console.log(response)
            // const { data } = await userValidation()

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        emailValidate(urlParams)
    }, [])
    return (


        <div>

            Hello user,

            You are now verified
            Please cilck here to login :  <NavLink to='/login' className='mx-3'><span >Login</span></NavLink>
        </div>
    )
};

export default Verify;