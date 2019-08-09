import React from 'react'
import logoch from "../logo-ch.svg"
import logolego from "../logolego.svg.png"

function Header() {
    return(
        <div>
        <div id="header" className="row">
            {/*Start logos Bar*/}
            <div id="logo" className="col-md-2"><div className="well"><img src={logoch} height="50px" alt="ContentCH"/></div></div>
            <div id="header-content" className="col-md-4"><div className="well"></div></div>
            <div id="logo" className="col-md-2"><div className="well"><img src={logolego} height="50px" alt=""/></div></div>
            <div id="header-content" className="col-md-4"><div className="well"></div></div>
            {/*End logos Bar*/}
            {/*Start Links Bar*/}
            <div className="col-md-12">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Инструкция по использованию портала</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Статус контента</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Личный кабинет</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" tabIndex="-1" aria-disabled="true">Выход</a>
                    </li>
                </ul>
            </div>
            {/*End Links Bar*/}
            {/*Start search bar*/}
            <div className="col-md-12">
                <div className="input-group">
                    <input type="text" className="form-control"/>
                    <div className="input-group-append">
                        <button className="btn btn-secondary" type="button">
                            Поиск
                        </button>
                    </div>
                </div>
            </div>
            {/*End of Search bar*/}

        </div >
            {/*Start links_2 Bar*/}
            <div className="row" style={{backgroundColor :"#ddd"}}>
                <ul className="nav" >
                    <li className="nav-item">
                        <a className="nav-link active" href="#">(Мои экспорты)</a>
                    </li>
                </ul>
            </div>
            {/*End links_2 Bar*/}
            {/*Start Breadcrumb*/}
            <div className="col-md-12"  >
                <nav aria-label="breadcrumb" >
                    <ol className="breadcrumb" style={{background: "#f0f0f0", display : "none"}}> {/* remove "display none"*/}
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Library</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
            </div>
            {/*End Breadcrumb*/}

        </div>
    )

}
export default Header