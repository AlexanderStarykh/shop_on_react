import {BasketItem} from './BasketItem';
import { useContext } from "react";
import { ShopContext } from "../context";


function BasketList() {
    const {
        order = [], 
        handleBasketShow,
    } = useContext(ShopContext);

    const totalPrice = order.reduce((sum, el) => {
        return sum + el.price.finalPrice * el.quantity;
    }, 0);
    
    return ( 
    <ul className="collection basket-list">
        <li className="collection-item active">Basket</li>
        {order.length ? (
            order.map((item) => 
                <BasketItem 
                    key={item.id} 
                    {...item} 
                />)
            ) : (
            <li className="collection-item">
                <b>Basket is empty</b>
            </li>
            )
        }
        <li className="collection-item active" >
            Total cost: {totalPrice} coins
        </li>
        <li className="collection-item active" >
            <button className='btn btn-small'>Apply</button>
        </li>
        <i className='material-icons basket-close' 
            onClick={handleBasketShow}
        >
            close
        </i>
    </ul>
  )
}

export {BasketList};