import React from 'react'
import SideBar from "./SideBar";
import MaineContent from "./MainContent/MaineContent";

class Catalog extends React.Component{
    constructor(props){
        super(props);

    }
    render() {
        return(
            <div>
                <div id="category" className="row">
                    {
                        this.props.isLoadingTree &&
                        <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                    }
                    {
                        !this.props.isLoadingTree &&
                        <SideBar data={this.props.tree_data}/>
                    }
                    <div id="featured" className="col-md-9">
                        {
                            this.props.isLoadingProd &&
                            <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                        }
                        {
                            !this.props.isLoadingProd &&

                            <MaineContent data={this.props.prod_data} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
export default Catalog