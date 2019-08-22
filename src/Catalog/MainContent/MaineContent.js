import React from 'react'
import CardHolder from "./CardHolder";

class MaineContent extends React.Component {

    render() {
        let {filterFlag} = this.props;

        let items = this.props.data.prod_data.filter( it =>(it));
        items.sort((a,b)=>{ //sort by lastUpdated
            if (a.lastUpdated <b.lastUpdated){
                return 1;
            }
            if (a.lastUpdated > b.lastUpdated){
                return -1;
            }
            return 0;
        })

        let filterItems = items.filter(({categoryId}) =>(
            filterFlag.includes(categoryId.toString())
        ))
        const itemsToIterate = filterFlag.length ? filterItems : items
        return (

            <div id="MaineContent" className="d-flex align-content-stretch flex-wrap">
                {

                    itemsToIterate.map( items =>
                        <CardHolder key={items.id} items={items}/>)
                }
            </div>
        )
    }

}

export default MaineContent