import React from 'react'
import './Lot-short.css'

const LotShort = (props) => {
    let { productQuantity, lastBet, finishDate, torgStatus, productName, productDescription, productImage } = props;

    return (
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
                            <li className="list-group-item bg-light text-dark">Дата і час закінчення: {finishDate}</li>
                        </ul>
                        

                    </div>
                </div>
            </div>
        </div >
    )
}

export default LotShort