import React, {Component} from 'react'
import SideBar from "../Catalog/SideBar/SideBar";
import MaineContent from "../Catalog/MainContent/MaineContent";
import SideBarPA from "./SideBarPA";
import MaineContentPA from "./MaineContentPA/MaineContentPA";

class PrivateArea extends Component {
    constructor(props) {
        super(props);
        this.state= {
            checkItemsSideBar: "Профиль пользователя",
            lastName: "",
            firstName: "",
            fatherName: "",
            email: "",
            phone: "",
            password: "",
            subscribe: [
                {
                  id : 1,
                  code : "WP_CH_CUSTOM_EXPORT_COMPLETE",
                    description : "Архив с выборочным экспортом готов для скачивания",
                    check : false
                },
                {
                    id : 2,
                    code : "WP_CH_NOTIFY_ABOUT_NEWS",
                    description : "Оповещения об обновлениях в каталоге",
                    check : false
                },
                {
                    id : 3,
                    code : "WP_CH_NOTIFY_ABOUT_ACCESS_CHANGE",
                    description : "Оповещение об изменении списка доступных элементов",
                    check : false
                },
            ],
            toggleSubscribe: [],
        }
        this.toggleItemMenu = this.toggleItemMenu.bind(this)
       console.log("props in privateArea : ",props)
    }
    toggleSubscribeItems=(e)=>{
        const {value,checked} = e.target;
        const copyToggleSubscribe = this.state.toggleSubscribe;
        checked
        ? this.setState({toggleSubscribe : [...copyToggleSubscribe,value]})
            : this.setState({toggleSubscribe : [...copyToggleSubscribe.filter(i=> i!=value)]})
    }
    toggleItemMenu=(item)=>{
        this.setState({
            checkItemsSideBar:item
        })
    }
    saveProfile=()=>{
        this.setState({
            lastName: document.getElementById("inputLastName").value,
            firstName: document.getElementById("inputFirstName").value,
            fatherName: document.getElementById("inputFatherName").value,
            email: document.getElementById("inputEmail").value,
            phone: "",
            password: "",
        })
    }
    render() {
        return(

            <div>
              <h1>{this.state.checkItemsSideBar}</h1>
                <div>
                    <div id="category" className="row" style={{border: "1px solid #d4eeff"}}>
                        {
                            <SideBarPA toggleItemMenu={this.toggleItemMenu}/>
                        }
                        <div id="featured" className="col-md-9" style={{border: "1px solid #d4eeff"}}>
                            {

                                <MaineContentPA {...this.state}
                                                saveProfile={this.saveProfile}
                                                toggleSubscribeItems={this.toggleSubscribeItems}
                                                handleClickItems={this.props.handleClickItems}
                                                cart={this.props.cart ? this.props.cart : []} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PrivateArea