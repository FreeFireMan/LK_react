import React from 'react'


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            displayChild: true,
            check: true,
            filterFlag: this.props.filterFlag
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick = (e) => {
        // console.log("SideBar value : "+e.target.value);

        this.props.aletPost(e.target.value, e.target.checked);
    }


    render() {
        const {filterFlag} = this.props;
        let children = null;
        if (this.state.displayChild){
            children = <div className="ml-4">{
                this.state.data.children.map((item) =>

                    <div id={item.id} key={item.id}>
                        {console.log("side bar : ",item)}
                        <label className="containerForTree">{item.name}
                            <input type="checkbox" value={item.id} onChange={this.handleClick} checked={filterFlag === item.id.toString()}/>
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