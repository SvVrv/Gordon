import React from 'react'
import './Lot-short.css'
import { Link } from 'react-router-dom'
const LotShort = (props) => {
    let { productQuantity, lastBet, finishDate, torgStatus, productName, productDescription, productImage ,torgId} = props;
    const dat = new Date(finishDate)

    function formatDate(date) {
        const monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const min = date.getMinutes();
        
        return day + ' ' + monthNames[monthIndex] + ' ' + year + ' o ' + hour + ':' + min;
    }
    const path = "/lot/" +torgId;
    
    return (
  
    <Link to={path} style={{ cursor: 'pointer' }} >
        <div className="lot-short container-fluid">


            <div className="align-items-center row border rounded d-flex">
                <div className="img-thumb col-2 ">

                    <img className="img-thumbnail" src={productImage ? productImage : "https://cdn.auth0.com/blog/react-js/react.png"} alt="lot" />
                </div>
                <div className="col-10 lot-text">
                    <div className="lot-header bg-light">
                        <b>{productName}</b>
                    </div>

                        <p>{productDescription}</p>

                    <div className="lot-footer bg-white">
                        <ul className="list-group list-group-horizontal-sm text-dark">
                            <li className="list-group-item bg-light text-dark">Кількість: {productQuantity}</li>
                            <li className="list-group-item bg-light text-dark">Остання ставка: {lastBet} грн</li>
                            <li className="list-group-item bg-light text-dark">Статус: {torgStatus}</li>
                                <li className="list-group-item bg-light text-dark">Дата і час закінчення: {formatDate(dat)}</li>
                                <li className="list-group-item bg-light text-dark">Статус: {torgId}</li>

                        </ul>
                        

                    </div>
                </div>
            </div>
        </div >
    </Link>
    )
}

export default LotShort