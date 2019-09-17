import React from 'react'
import SideBar from "./SideBar/SideBar";
import MaineContent from "./MainContent/MaineContent";

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.aletPost = this.aletPost.bind(this);
    }
    handleClickItems=(e)=>{
        this.props.handleClickItems(e)
    }

    aletPost(id, chek) {
        this.props.aletAppPost(id, chek)
    }
    render() {
      //  console.log("Catalog this.props.cart",this.props.cart)
        return (
            <div>
                <div id="category" className="row">
                    {
                        this.props.data.isLoadingTree &&
                        <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                    }
                    {
                        !this.props.data.isLoadingTree &&
                        <SideBar data={this.props.data.tree_data}
                                 aletPost={this.aletPost}
                                 filterFlag={this.props.data.filterFlag}
                        />
                    }
                    <div id="featured" className="col-md-9">
                        {
                            this.props.data.isLoadingTree &&
                            <i className="fa fa-spinner fa-spin">Придумать заглушку загрузки</i>
                        }
                        {

                            !this.props.data.isLoadingProd &&
                            <MaineContent {...this.props} cart={this.props.data.cart} handleClickItems={this.handleClickItems} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Catalog