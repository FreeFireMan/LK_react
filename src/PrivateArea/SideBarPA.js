import React from "react";


class SideBarPA extends React.Component{

    toggleItemMenu=(item)=>{
        this.props.toggleItemMenu(item)
    }
    render() {
        const items = [
            "Профиль пользователя",
            "Подписки",
            "Мои экспорты",
            "Список выбранного",
            "Управление правами",
            "Проект",
        ]
        return (
            <div className="col-md-3 pl-0" style={{border: "1px solid #d4eeff"}}>
                <div className="list-group">
                    {items.map((item,i) => (
                            <a href="#" key={i} className='list-group-item list-group-item-action' onClick={this.toggleItemMenu.bind(null,item)}>{item}</a>
                        )
                    )}
                </div>
            </div>
        )
    }

}


export default SideBarPA