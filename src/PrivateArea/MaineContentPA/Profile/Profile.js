import React from "react";

function Profile(props) {
    return(
        <form>
            <div className="form-group row">
                <label htmlFor="inputLastName" className="col-sm-2 col-form-label">Фамилия:</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputLastName" placeholder={props.lastName ? props.lastName : "Last name"}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">Ваше имя:</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputFirstName" placeholder={props.firstName ? props.firstName : "First name"}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputFatherName" className="col-sm-2 col-form-label">Отчество:</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputFatherName" placeholder={props.fatherName ? props.fatherName : "Father's name"}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputEmail" className="col-sm-2 col-form-label">E-mail:</label>
                <div className="col-sm-9">
                    <input type="email" className="form-control" id="inputEmail" placeholder={props.email ? props.email : "email"}/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPhone" className="col-sm-2 col-form-label">Телефон:</label>
                <div className="col-sm-9">
                    <input type="tel" defaultValue="+7(555)-555-5555"  className="form-control" id="example-tel-input" placeholder="Phone Number"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Пароль:</label>
                <div className="col-sm-9">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>
            </div>
       {/*     <fieldset className="form-group">
                <div className="row">
                    <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1"
                                   value="option1" checked/>
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    First radio
                                </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2"
                                   value="option2"/>
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Second radio
                                </label>
                        </div>
                        <div className="form-check disabled">
                            <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3"
                                   value="option3" disabled/>
                                <label className="form-check-label" htmlFor="gridRadios3">
                                    Third disabled radio
                                </label>
                        </div>
                    </div>
                </div>
            </fieldset>
            <div className="form-group row">
                <div className="col-sm-2">Checkbox</div>
                <div className="col-sm-10">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                            <label className="form-check-label" htmlFor="gridCheck1">
                                Example checkbox
                            </label>
                    </div>
                </div>
            </div>*/}
            <div className="form-group row">
                <div className="col-sm-9">
                    <button type="button" className="btn btn-primary" onClick={props.saveProfile}>Сохранить Изменения</button>
                </div>
            </div>
        </form>
    )
}
export default Profile