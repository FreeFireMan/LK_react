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
        const {value} = e.target;
        const copySelectedItems = this.state.selectedItems;

        this.setState({
            selectedItems: [...copySelectedItems.filter(val =>val.id !== value)]
        })
    }

    componentWillMount() {
        const {cart} = this.props;
        fetch(`http://localhost:8080/api/shotproducts/${cart}`)
            .then(response => {
                 console.log("SelectedItems response : ")
                return response.json();
            })
            .then(result => {
                console.log("SelectedItems result : ", result)
                this.setState({
                    isLoadingSelectedItems: false,
                    selectedItems: result
                })
            })
            .catch(error => {
                console.log("aletAppPost error : " + error)

            })

    }

    render() {
        const {isLoadingSelectedItems, selectedItems} = this.state;
        //console.log("Selected Items", this.props)
        return (
            <div id="MaineContent" className="d-flex align-content-stretch flex-wrap">
                {
                    this.props.cart.length>0 &&
                    !isLoadingSelectedItems &&
                    selectedItems.map(items =>
                        <CardHolder key={items.id}
                                    items={items}
                                    cart={this.props.cart}
                                    handleClickItems={this.handleClickItems}
                        />)
                }
            </div>
        )
    }
}

export default SelectedItems