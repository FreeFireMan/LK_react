import React from 'react'
import SideBar from "./SideBar";
import MaineContent from "./MainContent/MaineContent";
import {debuggerStatement} from "@babel/types";

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.aletPost = this.aletPost.bind(this);
    }
    handleClickCarrentPageC =(val) => {
    this.props.handleClickCarrentPage(val)
}
    aletPost(id, chek) {
        this.props.aletAppPost(id, chek)
    }
    render() {
        return (
            <div>
                <div id="category" className="row">
                    {
                        this.props.data.isLoadingTree &&
                        <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                    }
                    {
                        !this.props.data.isLoadingTree &&
                        <SideBar data={this.props.data.tree_data} aletPost={this.aletPost}/>
                    }
                    <div id="featured" className="col-md-9">
                        {
                            this.props.data.isLoadingTree &&
                            <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                        }
                        {
                            !this.props.data.isLoadingProd &&

                            <MaineContent data={this.props.data.prod_data} filterFlag={this.props.data.filterFlag} handleClickCarrentPageC={this.handleClickCarrentPageC} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Catalog