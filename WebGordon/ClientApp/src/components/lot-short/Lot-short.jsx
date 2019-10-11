import React from 'react'
import './Lot-short.css'
import { Link } from 'react-router-dom'
const LotShort = (props) => {
    let { productQuantity, dimensions, lastBet, finishDate, torgStatus, productName, productDescription, productImage, torgId, seller } = props;
    finishDate = new Date(finishDate).toLocaleString('uk-UA');
    let path = "/lot/" + torgId;
    if (torgStatus == "непочаті")
        path = "/addlot/lot/" + torgId;
    if (torgStatus == "завершені")
        path = "/lotend/" + torgId;
    let end = null;
    if (torgStatus == "завершені") {
        end = <span class="badge badge-danger float-right">Торг завершений!!!!
            Результат по кліку</span>;
    }
   
    let sel = null;
    if (seller)
        sel = <span class="badge badge-info float-left">Мій торг</span>;
    return (
  
        <Link to={path}  style={{ cursor: 'pointer' }} >
        <div className="lot-short container-fluid">


            <div className="align-items-center row border rounded d-flex">
                <div className="img-thumb col-2 ">

                    <img className="img-thumbnail" src={productImage ? productImage : "https://cdn.auth0.com/blog/react-js/react.png"} alt="lot" />
                </div>
                <div className="col-10 lot-text">
                        <div className="lot-header bg-light">
                            {sel}
                            {end}
                        <b>{productName}</b>
                    </div>

                        <p>{productDescription}</p>

                    <div className="lot-footer bg-white">
                        <ul className="list-group list-group-horizontal-sm text-dark">
                                <li className="list-group-item bg-light text-dark">Кількість: {productQuantity}  {dimensions}</li>
                            <li className="list-group-item bg-light text-dark">Остання ставка: {lastBet} грн</li>
                            <li className="list-group-item bg-light text-dark">Статус: {torgStatus}</li>
                                <li className="list-group-item bg-light text-dark">Дата і час закінчення: {finishDate}</li>
                                

                        </ul>
                        

                    </div>
                </div>
            </div>
        </div >
    </Link>
    )
}

export default LotShort