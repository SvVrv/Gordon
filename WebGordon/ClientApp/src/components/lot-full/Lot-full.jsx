import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classnames from 'classnames';
import './Lot-full.css';

class LotFull extends Component {

    constructor(props) {
        super(props);
        this.state = {
          lotId:this.props.lotId

        }
    };

    render() {
        const errors = {};
        const isLoading = null;

        console.log("llll", this.state)
        return (
            <React.Fragment>
                <div class="row content border rounded-lg" >
                    <div class="col-sm-12">
                        <div class="col-sm-12" style={{ borderBottom: "1px solid #dfdfdf" }}>
                            <div class="col-sm-7 xs_center_left_upwards">
                                <span class="text">Назва лота Продам дрова</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div class="border" >
                            <img className="img-thumbnail border-0" src="https://cdn.auth0.com/blog/react-js/react.png" alt="lot" />
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div class="border-bottom">
                            <h3 class="title" >Знову назва лота 2019 Армения 1000 драм Адмирал Исаков 125 лет серебро 1 унция в родной коробке с сертификатом</h3>
                            <span class="">Количество: 1</span>
                        </div>
                        <div class="">
                            <div class="row border-bottom" style={{ marginRight: "4px" }}>
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    Актуальна ціна:
                            </div>
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    50 грн
                            </div >

                            </div >
                            <div class="row border-bottom" style={{ marginRight: "4px" }}>
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    Кількість ставок:
                            </div>
                                <div class="col-xs-6 col-sm-6 col-md-6">
                                    12
                            </div >
                                <div class="">
                                    <form onSubmit={this.onSubmitForm}>
                                        <h2 style={{ textAlign: "center" }}></h2>
                                        {
                                            !!errors.invalid ?
                                                <div className="alert alert-danger">
                                                    <strong>Помилка!</strong> {errors.invalid}.
                                        </div> : ''
                                        }
                                        <div className={classnames('form-group', { 'has-error': !!errors.name })}>

                                            <label htmlFor="curprice">Ваша ставка</label>
                                            <input type="text"
                                                className="form-control"
                                                id="curprice"
                                                name="curprice"
                                                value={51}
                                            />

                                            <div className="form-group">
                                                <div className="">
                                                    <button type="submit"
                                                        className="btn btn-warning"
                                                        style={{ width: 100 + '%' }}
                                                        disabled={isLoading}>Зробити ставку <i className="fa fa-check-circle" aria-hidden="true"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div >
                                <div class="row">
                                    Завершение: 2 часа (02.10.2019 16:00)
                            </div >
                                <div class="row">
                                    Продавець:
                                <img className="img-thumbnail" style={{ width: "40px" }} src="https://cdn.auth0.com/blog/react-js/react.png" alt="Userimage" />
                                    ЮзерАдмін
                            </div >
                            </div >
                            <div class="row border-bottom" style={{ marginRight: "4px" }}>
                                Стоимость доставки оплачивает: Покупатель
                        </div>

                        </div>
                    </div >
                </div >




                <div class="row content border rounded-lg" >
                    <div>
                        <ul class="nav nav-tabs " id="myTab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Описание</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Оплата и доставка</a>
                        </li>

                    </ul>
                        <div class="tab-content " id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <h5>стандартное описание:</h5>
                            <div>
                                <h5><strong>Просьба покупателям выходить на связь в течение 3-х
                                дней с конкретными предложениями по выкупу лота. Лот должен быть
                                выкуплен в течение пяти дней после договоренности о механизмах
                                передачи лота и денег. Если в течение 5 суток не получу конкретных
                                предложений или вы не ответили на мое письмо, то на шестой день лот
                                перевыставляется и претензии по продаже лота не принимаю, вам
                                    ставлю отрицательный отзыв.</strong></h5>
                                <h5>
                                    <strong>Лоты</strong>&nbsp;объединяются&nbsp;в&nbsp;одну&nbsp;посылку!!</h5>
                                <h5><strong>Со своей стороны обязуюсь высылать лот в течение
                                    максимум пяти дней со дня отправки вами денег</strong></h5>

                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div>
                                    <h5>Тип сделки:</h5>
                                <p>Предоплата</p>
                            </div>
                            <div>
                                <h5>Способы оплаты:</h5>
                                    <span>По договоренности</span><br/>
                                    <span>Банковский перевод</span>
                            </div>
                            <div>
                                <h5>Доставка:</h5>
                                <p>Почта России по городу: <span>300 руб.</span> по стране: <span>300 руб.</span> по миру:  <span>300 руб.</span><br />Комментарий: <i>заказное письмо </i></p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

















            </React.Fragment>
        )
    }
}

export default LotFull