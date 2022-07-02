import {BasketItem} from './BasketItem';

function BasketList(props) {
    const {
        order = [], 
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        decrQuantity = Function.prototype,
        incrQuantity = Function.prototype,
    } = props;

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
                    removeFromBasket={removeFromBasket}
                    incrQuantity={incrQuantity}
                    decrQuantity={decrQuantity}
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