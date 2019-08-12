import React from 'react'
import {Link} from 'react-router-dom'
import CardHolder from "./CardHolder";

class MaineContent extends React.Component {
    constructor(props) {


        super(props)
        this.state = {
          data: props.data,
            filterFlag: props.filterFlag,

        }
    }


    render() {
        let {filterFlag} = this.state;
        let items = this.state.data.flat().filter( it =>(it));
        let filterItems = filterFlag && items.filter(fil =>(
            fil &&
            filterFlag.includes(fil.categoryId.valueOf())
        ))



        return (
            <div className="row">
                {

                    this.state.filterFlag.length === 0 &&
                    items && items.map( item => {

                        return <CardHolder key={item.id} items={item}/>
                    })

                }
                {
                    this.state.filterFlag.length > 0 &&
                    filterItems.map( items => ( items &&

                         <CardHolder key={items.id} items={items}/>)
                    )

                }

            </div>
        )
    }

}

export default MaineContent