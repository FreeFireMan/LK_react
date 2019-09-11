import React from 'react'


class Child extends React.Component{
    handleClick = (e)=>{
        this.props.handleClick(e)
    }
    render() {
        let {filterFlag} = this.props;
        return(
            <div className="ml-4">
                {
                    this.props.items.map((item)=>
                <div id={item.id} key={item.id}>
                    <label className="containerForTree">{item.name}
                        <input type="checkbox" value={item.id} onChange={this.handleClick} checked={filterFlag === item.id.toString()}/>
                        <span className="checkmark"  ></span>
                    </label>
                    {item.children && <Child items={item.children} filterFlag={filterFlag} handleClick={this.handleClick}/>}
                </div>
            )
                }
                </div>
        )
    }
}
export default Child