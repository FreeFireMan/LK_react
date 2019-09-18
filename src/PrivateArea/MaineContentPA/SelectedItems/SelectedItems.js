import React from 'react'
import CardHolder from "../../../Catalog/MainContent/CardHolder";

class SelectedItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoadingSelectedItems: true,
            selectedItems: []
        }
    }

    handleClickItems = (e) => {
        this.props.handleClickItems(e)
    }

    componentWillMount() {

    }

    render() {
        return (
            <div id="MaineContent" className="d-flex align-content-stretch flex-wrap">
                {/* {
                    this.props.data.prod_data.map( items =>
                        <CardHolder key={items.id} items={items} cart={this.props.cart} handleClickItems={this.handleClickItems}/>)
                }*/}
            </div>
        )
    }
}

export default SelectedItems