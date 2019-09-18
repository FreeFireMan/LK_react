import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import Modal from "../../Modal/Modal";

class CardHolder extends Component {
    constructor(props) {
        super(props)
        this.state = { isOpen: false };
            // this.handleClickItems = this.handleClickItems.bind(this);
    }
    handleShowDialog = () => {
        this.setState({ isOpen: !this.state.isOpen });

        console.log("cliked",this.props.items);
    };

    handleClickItems = (e) => {
        this.props.handleClickItems(e)
    }

    render() {
        const {id,baseImageThumbs,partNumber,article,originBaseImage} =this.props.items;
        const {cart} =this.props;
        return (
            <div key={id} className="card m-1" style={{width: "260px"}}>
                <label className="containerForTree">
                    <input type="checkbox" onChange={this.handleClickItems} value={id} checked={cart.includes(id) }/>
                    <span className="checkmark"></span>
                </label>
                {/*<NavLink to={'/' + id}><img src={baseImageThumbs} className="card-img-top"
                                                             style={{width: "250px"}} alt="..."/></NavLink>*/}
                    <img src={baseImageThumbs}
                         onClick={this.handleShowDialog}
                         className="card-img-top"
                         style={{width: "250px"}} alt="..."/>
                {this.state.isOpen && (
                    <dialog
                        className="dialog"
                        style={{ position: "fixed",
                            zIndex: "1",
                            border: "1px solid #d4eeff"}}
                        open


                        onClick={this.handleShowDialog}
                    >
                        <img
                            className="image"
                            src={originBaseImage}
                            onClick={this.handleShowDialog}
                            style={{width: "70%"}}
                            alt="no image"
                        />
                    </dialog>
                )}

                <div className="card-body">
                    <h6 className="card-title">Код производителя: {partNumber}</h6>
                    <p className="card-text"><NavLink
                        to={'/' + id}>{article}</NavLink></p>

                    <Modal/>
                </div>
            </div>
        )
    }
}

export default CardHolder