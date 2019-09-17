import React from "react";
import Carousel from "./Carousel";



class Wrapper extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            activeItem: 0,
        };
    }

    handleEvent = ( e, actionType, item, items ) => {
        e.preventDefault();
        let itemsLength, activeItem;

        switch( actionType ){
          /*  case 'clickItem':
                //console.info('MenuContent->paginationRender', { actionType, id: item.id, item });
                this.setState({ activeItem: item.id });
                break;*/
            case 'prevItem':
                activeItem = this.state.activeItem;
                if ( activeItem === 0  ){
                    break;
                }
                activeItem -= 1;
                this.setState({ activeItem });
                break;
            case 'nextItem':
                itemsLength = items.length;
                activeItem = this.state.activeItem;
                if (activeItem === itemsLength -1) {
                    break;
                }
                activeItem += 1;
                this.setState({ activeItem });
                break;
        }
        //console.info('MenuContent->handleEvent()', { actionType, item, items });

    }

    render(){
        let props = this.props;
        const { activeItem } = this.state;
        props = { ...props, handleEvent: this.handleEvent, activeItem };

        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-1">
                </div>
                <div className="col-10">
                    <Carousel { ...props }/>
                </div>
                <div className="col-1">
                </div>
            </div>
        </div>

        )
    }
}
export default Wrapper;