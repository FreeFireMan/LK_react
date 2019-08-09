import React from 'react'
import PropBlock from './PropBlock'
import VideoContent from "./VideoContent";

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            isLoadingData: true,
            id : props.match.params.number,
        }

    }


    componentDidMount() {
        fetch("http://localhost:8080/api/products/"+this.state.id+"/full")
            .then(response => {

                return response.json();
            })
            .then(result => {
                //console.log(result.children)
                this.setState({
                        data: result,
                        isLoadingData: false
                    }
                )
            })
            .catch(error => {
                console.log("MyErrorInFetch in Catalog Component : " + error)
            })
        //------End load tree data---------------------------------------


    }


    render() {

        const {date, article, brand, manufacturer, model,
            series, ean, partNumber, baseImage, longName,
            annotation, instructions, videos } = this.state.data;


        return (

            <div>
                {
                    !this.state.isLoadingData &&
                    <div className="row">
                        <div className="col-md-5"> {/*for images*/}
                            <img src={baseImage} className="img-fluid" alt="..."/>
                        </div>
                        <div className="col-md-7 info-block"> {/*for content*/}
                            <div className="mt-3">
                                <h3>{article}</h3>
                                <div className="catalog-element"><span className="catalog-element-span">Дата последнего обновления: </span>{date}
                                </div>
                                <div className="catalog-element"><span
                                    className="catalog-element-span">Артикул: </span>{partNumber}</div>
                                <div className="catalog-element"><span
                                    className="catalog-element-span">Бренд: </span>{brand}</div>
                                <div className="catalog-element"><span
                                    className="catalog-element-span">Производитель: </span>{manufacturer}</div>
                                <div className="catalog-element"><span
                                    className="catalog-element-span">Модель: </span>{model}</div>
                                <div className="catalog-element"><span
                                    className="catalog-element-span">Серия: </span>{series}</div>
                                <div className="catalog-element"><span
                                    className="catalog-element-span">Дата запуска: </span></div>
                                {ean && <div className="catalog-element"><span
                                    className="catalog-element-span">EAN: </span>{ean}</div>}
                                  {  /*Вывод описания продукта*/}
                                {annotation && <div>
                                    <div><span className="catalog-element-span">Описание</span></div>
                                    <div dangerouslySetInnerHTML={{__html: annotation}}/>
                                </div>}
                             {  /* Вывод инструкций нужно подумать как реализовать*/}
                              {/*  <div>
                                    <div><span className="catalog-element-span">Инструкции</span></div>
                                    { instructions.map(i => (
                                        <a href={i.name}></a>
                                        )) }

                                </div>*/}
                                {/*Вывод ссылок для  видосиков*/}
                                <VideoContent data={videos} />
                            </div>


                            {
                                !this.state.isLoadingData && <PropBlock data={this.state.data.groups}/>
                            }

                        </div>

                    </div>
                }
            </div>
        )
    }

}

export default Product