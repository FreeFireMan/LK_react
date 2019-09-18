import React from "react";
import Profile from "./Profile/Profile";
import Subscribe from "./Subscribe/Subscribe";
import Project from "./Project/Project";


function MaineContentPA(props) {
    return(
        <div id="MaineContent" className="col-md-13" >
            {props.checkItemsSideBar === "Профиль пользователя" && <Profile {...props}/>}
            {props.checkItemsSideBar === "Подписки" && <Subscribe {...props}/>}
            {props.checkItemsSideBar === "Проект" && <Project/>}
        </div>
    )
}
export default MaineContentPA