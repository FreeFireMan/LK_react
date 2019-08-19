import React, {Component} from 'react'

class Pagination extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick =(val) => {
        this.props.handleClickCarrentPage(val)
    }
    render() {
        let currentPage =  this.props.currentPage;
        return(
            <div>
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>

                        <li className="page-item active" aria-current="page">
                              <span className="page-link">
                                {currentPage}
                                <span className="sr-only"></span>
                              </span>
                        </li>
                        <li className="page-item"><a className="page-link" href="#"  onClick={this.handleClick.bind(null,(1))}>{currentPage+1}</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={this.handleClick.bind(null,(2))}>{currentPage+2}</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Pagination