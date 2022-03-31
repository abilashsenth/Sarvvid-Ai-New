import React from "react"
import profile from "../../assets/img/profile.png"
// import homeS from '../img/home-s.svg'
// import fileN from '../img/file-n.svg'
// import settingsN from "../img/settings-n.svg"
import logo from '../../assets/img/sarvvid-logo.svg'
import "./Navbar.css"

import HomeI from "@material-ui/icons/Home"
import FolderI from "@material-ui/icons/Folder"
import SettingsI from "@material-ui/icons/Settings"
import NotificationsI from "@material-ui/icons/Notifications"

const Navbar = () => {



    return (
        <div className="all" >
            <div className="nav">
                <div className="navcontainer">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="options">
                        <a href="/home" >
                        <div className="option active">
                            <HomeI  />
                        </div>
                        </a>

                       <a href="/files">
                       <div className="option">
                            <FolderI/>
                        </div>
                       </a>
                       <a href="/settings">
                       <div className="option">
                            <SettingsI/>
                        </div>
                       </a>
                        <div className="option">
                            <NotificationsI/>
                        </div>
                        <div className="option">
                            <img src = {profile} alt="profile" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar