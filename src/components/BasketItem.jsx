import { useContext } from "react";
import { ShopContext } from "../context";


function BasketItem(props) {
    const {
        id,
        name,
        price,
        quantity,
    } = props;

    const {removeFromBasket, decrQuantity, incrQuantity} = useContext(ShopContext);
    return (
        <li className="collection-item">
            {name} 
                <i className="material-icons basket-quantity" onClick={() => decrQuantity(id)}>remove</i>
            x{quantity}
                <i className="material-icons basket-quantity" onClick={() => incrQuantity(id)}>add</i>
            = {price.finalPrice * quantity}
            <span className="secondary-content" onClick={() => removeFromBasket(id)}>
                <i className="material-icons basket-delete">close</i>
            </span>
        </li>
    )
    
}

export {BasketItem};