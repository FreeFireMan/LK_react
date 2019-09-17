import React, {Component} from 'react'
import SideBar from "../Catalog/SideBar/SideBar";
import MaineContent from "../Catalog/MainContent/MaineContent";
import SideBarPA from "./SideBarPA";
import MaineContentPA from "./MaineContentPA";

class PrivateArea extends Component {
    constructor(props) {
        super(props);

       console.log("props in privateArea : ",props)
    }
    render() {
        return(
            <div>
              <h1>Личный кабинет</h1>
                <div>
                    <div id="category" className="row" style={{border: "1px solid #d4eeff"}}>
                        {
                           // this.props.data.isLoadingTree &&
                           // <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                        }
                        {
                           // !this.props.data.isLoadingTree &&
                            <SideBarPA/>
                        }
                        <div id="featured" className="col-md-9" style={{border: "1px solid #d4eeff"}}>
                            {
                              //  this.props.data.isLoadingTree &&
                               // <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                            }
                            {

                               // !this.props.data.isLoadingProd &&
                                <MaineContentPA  />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PrivateArea