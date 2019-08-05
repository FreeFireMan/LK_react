import React from 'react'


class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data: this.props.data,
        }
    }



            render() {

                return (
                    <div className="col-md-3">
                        <div>
                    {
                        this.state.data.map((item) =>
                            <div id={item.id} key={item.id}>
                                <label className="containerForTree">{item.name}
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                </label>
                            </div>)
                    }
                        </div>
                </div>)
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

