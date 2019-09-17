import React from "react";
import Agreement from "../Agreement/Agreement";

function SideBarPA(props) {
    const item = [
        "Профиль пользователя",
        "Подписки",
        "Мои экспорты",
        "Список выбранного",
        "Управление правами",
        "Проект",
    ]
    return (
        <div className="col-md-3 pl-0" style={{border: "1px solid #d4eeff"}}>
            <ul>
                {item.map(i => (
                        <li type="none"><a href="#">{i}</a></li>
                    )
                )}
            </ul>
        </div>
    )

}

export default SideBarPA