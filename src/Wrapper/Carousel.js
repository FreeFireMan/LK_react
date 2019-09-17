import React from "react";
class Carousel extends React.Component {
    constructor( props ){
        super( props );
        console.log("console",props)
    }

    //console.info('Carousel->carouselRender [0]', { source, state: this.state });

    carouselRender = (  source, activeItem, handleEvent ) => {

        const indicators = source.map(( item, i ) => {
           // console.log("indicators",item, i )
            let itemClass = '';
            if( item.id === activeItem ){
                itemClass += ' active';
            }
            //console.info('Carousel->carouselRender [3]', { id: item.id, item, pageItemClass, activeItem: activeItem });
            return <li key={i} data-target="#demo" data-slide-to="1" className={ itemClass }
                       onClick={ e => handleEvent( e, 'clickItem', item )}>></li>;
        });

        const imgs = source.map(( item, i ) => {
            let itemClass = 'carousel-item';
            if( item.id === activeItem ){
                itemClass += ' active';
            }
            //console.info('Carousel->carouselRender [5]', { id: item.id, item, pageItemClass, activeItem: activeItem });
            return <div key={i} className={ itemClass }>
                <img src={item.src} className="img-fluid" />
            </div>;
        });
      //  console.log("imgs",imgs)

        //console.info('Carousel->carouselRender [7]', { });
        return <div id="demo" className="carousel slide" data-ride="carousel" data-pause="hover">
            <ul className="carousel-indicators">
                { indicators }
            </ul>
            <div className="carousel-inner">
                { imgs }
            </div>
            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"
                      onClick={e => handleEvent( e, 'prevItem', {}, source )}>
                </span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next" >
                <span className="carousel-control-next-icon"
                      onClick={e => handleEvent( e, 'nextItem', {}, source )}>
                </span>
            </a>
        </div>;
    };

    render() {
        const { itemsSrc, activeItem, handleEvent } = this.props;
        //console.info('MenuContent->render()', { source });

        return <div>{this.carouselRender( itemsSrc, activeItem, handleEvent ) }</div>;
    }
}
export default Carousel