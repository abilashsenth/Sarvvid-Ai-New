
import React, {useState} from "react";


const Forgot = () => {

    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const resetPass = async() => {

    }


    return (
        <div className="all">
            <form action="#">
                  <div className="form">
                  <h1>Reset Password</h1>
                    

                    <p>New Password</p>
                    <input type="password" placeholder="Password" onChange={(e) => setNewPass(e.target.value)}/>
                    <p>Confirm Password</p>
                    <input type="password" placeholder="Password" onChange={(e) => setConfirmPass(e.target.value)}/>
                    <button type="submit"  onClick={(e) => resetPass(e)} >Reset</button>
                    
                  </div>

                </form>
        </div>
    )
}


export default Forgot;
