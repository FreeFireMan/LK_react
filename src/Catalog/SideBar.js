import React from 'react'


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            displayChild: false,
        }
    }


    render() {
        let children = null;
        let subChildren = null;
        if (this.state.displayChild){
            children = <div className="ml-4">{
                this.state.data.children.map((item) =>
                    <div id={item.id} key={item.id}>
                        <label className="containerForTree">{item.name}
                            <input type="checkbox" checked/>
                            <span className="checkmark"  ></span>
                        </label>
                    </div>)
            }</div>
        }
        return(
            <div className="col-md-3 pl-0">
                <div>
                            <div id={this.props.data.id} key={this.props.data.id}>
                                <label className="containerForTree">{this.props.data.name}
                                    <input type="checkbox" onClick={this.expandParent}/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                    {
                        children
                    }
                </div>
            </div>
        )
    }
    expandParent = () => {
        this.setState({
            displayChild: !this.state.displayChild
        })
    }

}

// function LabelTree(props) {
//
//
//     return(
//         <div id={props.value.id}   >
//         <label className="containerForTree">{props.value.name}
//             <input type="checkbox" />
//             <span className="checkmark"></span>
//         </label>
//         </div>
//     )
// }

export default SideBar

