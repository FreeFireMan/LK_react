import React, {Component} from 'react'

class Pagination extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick =(v) => {
        this.props.handleClickCarrentPage(v)

    }

    render() {
        let {currentPage,totalPages} =  this.props;
        return(
            <div  >
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className={currentPage-1 <= 0 ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={this.handleClick.bind(null,({"val":-1,"changeState" : true}))}>&larr; Назад</a>
                        </li>
                        <li className="page-item" aria-current="page">
                            <a className="page-link" href="#"  onClick={this.handleClick.bind(null,({"val":0,"changeState" : false}))}>{currentPage}</a>
                        </li>
                        <li className={currentPage+1 >= totalPages ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#"  onClick={this.handleClick.bind(null,({"val":1,"changeState" : false}))}>{currentPage+1}</a></li>
                        <li className={currentPage+2 >= totalPages ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={this.handleClick.bind(null,({"val":2,"changeState" : false}))}>{currentPage+2}</a></li>
                        <li className={currentPage+3 >= totalPages ? "page-item disabled" : "page-item"}>
                            <a className="page-link" href="#" onClick={this.handleClick.bind(null,({"val":1,"changeState" : true}))}>Вперед &rarr;</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Pagination