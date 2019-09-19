import React from 'react'
import CardHolder from "./CardHolder";

class MaineContent extends React.Component {
    handleClickItems=(e)=>{
        this.props.handleClickItems(e)
    }
    render() {
        //console.log("MaineContent this.props.cart",this.props.cart)
        return (
            <div id="MaineContent" className="d-flex align-content-stretch flex-wrap">
                {
                    this.props.data.prod_data.map( items =>
                        <CardHolder key={items.id}
                                    items={items}
                                    cart={this.props.cart}
                                    handleClickItems={this.handleClickItems}/>)
                }
            </div>
        )
    }

}

export default MaineContent