import React from 'react'
import Child from "./Child";


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayChild: true,
            check: true,
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        // console.log("SideBar value : "+e.target.value);

        this.props.selectedCategory(e.target.value, e.target.checked);
    }


    render() {
        const {filterFlag} = this.props;

        let children = null;
        if (this.state.displayChild){
           children = <Child items={this.props.data.children} filterFlag={filterFlag} handleClick={this.handleClick}/>
        }


        return(
            <div className="col-md-3 pl-0">
                <div>
                    <div id={this.props.data.id} key={this.props.data.id}>
                        <label className="containerForTree">{this.props.data.name}
                            <input type="checkbox" onClick={this.expandParent} defaultChecked={this.state.check}/>
                            <span className="checkmark" data-toggle="popover" data-content="Disabled popover">

                                    </span>

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
            displayChild: !this.state.displayChild,
            check: !this.state.check,

        })
    }
}


export default SideBar