import React, {Component} from 'react'
import {NavLink} from "react-router-dom";
import Lightbox from 'react-image-lightbox';


class CardHolder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            photoIndex: 0,

        };

        // this.handleClickItems = this.handleClickItems.bind(this);
    }

    handleShowDialog = () => {
        this.setState({isOpen: !this.state.isOpen});

        // console.log("cliked",this.props.items);
    };

    handleClickItems = (e) => {
        this.props.handleClickItems(e)
    }

    render() {
        //console.log("CardHolder", this.props);
        const {id, baseImageThumbs, partNumber, article, originBaseImage, baseImage} = this.props.items;
        const {cart} = this.props;
        const {isOpen, photoIndex} = this.state;
        const images = [originBaseImage];
        return (
            <div key={id} className="card m-1" style={{width: "260px"}}>
                <label className="containerForTree">
                    <input type="checkbox" onChange={this.handleClickItems} value={id} checked={cart.includes(id)}/>
                    <span className="checkmark"></span>
                </label>
                {/*<NavLink to={'/' + id}><img src={baseImageThumbs} className="card-img-top"
                                                             style={{width: "250px"}} alt="..."/></NavLink>*/}
                <img src={baseImageThumbs ? baseImageThumbs : baseImage}
                     onClick={this.handleShowDialog}
                     className="card-img-top"
                     style={{width: "250px"}} alt="..."/>

                <div>
                    {isOpen && (
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            onCloseRequest={() => this.setState({isOpen: false})}
                            imageTitle={article}
                            enableZoom={false}
                        />
                    )}
                </div>


                <div className="card-body">
                    <h6 className="card-title">Код производителя: {partNumber}</h6>
                    <p className="card-text"><NavLink
                        to={'/' + id}>{article}</NavLink></p>

                </div>
            </div>
        )
    }
}

export default CardHolder