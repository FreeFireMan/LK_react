import React from "react";
import './Footer.css'
import {NavLink} from "react-router-dom";


function Footer()
{
    return(
        <div>
            <div className="footer-top row">
                <div className="menu-footer col-sm-6 col-md-4">
                    <div className="well">© ContentHub 2019 Все права защищены</div>
                </div>
                <div className="menu-footer col-sm-6 col-md-4">
                    <div className="well"><NavLink to="/agreement">Согласие на обработку персональных данных</NavLink></div>
                </div>
                <div className="menu-footer col-sm-6 col-md-3">
                    <div className="well"><a href="/#">Политика в отношении обработки
                        персональных данных</a></div>
                </div>
                <div className="menu-footer col-sm-6 col-md-1">
                    <div className="well"><a href="#" title="Вернуться к началу" className="topbutton">&uarr;Наверх</a></div>
                </div>
            </div>
            <div className="footer-bottom row">
                <div className="copyrights col-sm-6 col-md-6">
                    <div className="well"></div>
                </div>
                <div className="copyrights col-sm-6 col-md-6">
                    <div className="well">
                        {/*<a href="#" title="Вернуться к началу" className="topbutton">^Наверх</a>*/}</div>
                </div>
            </div>

        </div>

    )
}
export default Footer;