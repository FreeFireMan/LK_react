import React, {Component} from 'react'
import {NavLink} from "react-router-dom";

class CardHolder extends Component {
    render() {
        return(
            <div key={this.props.items.id} className="card m-1" style={{width: "260px"}}>
                <label className="containerForTree">
                    <input type="checkbox"/>
                    <span className="checkmark"></span>
                </label>
                <NavLink to={'/'+this.props.items.id}><img src={this.props.items.baseImage} className="card-img-top" style={{width: "250px"}} alt="..."/></NavLink>
                <div className="card-body">
                    <h6 className="card-title">Код производителя: {this.props.items.partNumber}</h6>
                    <p className="card-text"><NavLink to={'/'+this.props.items.id}>{this.props.items.article}</NavLink></p>
                    {/* <a href={items.id} className="btn btn-primary">Go somewhere</a>*/}
                </div>
            </div>
        )
    }
}
export default CardHolder