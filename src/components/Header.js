import React from "react";
import './Header.css';


export default ({black})=>{
    return(
        <header className={black ?"black" : ''}>
            <div className="header--logo">
                <img src="https://img.elo7.com.br/product/zoom/2F57C45/poster-impresso-netflix-logo-basquete.jpg"/>
            </div>
            <div className="header--user">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Netflix-avatar.png/640px-Netflix-avatar.png"/>
            </div>
        </header>
    )
}