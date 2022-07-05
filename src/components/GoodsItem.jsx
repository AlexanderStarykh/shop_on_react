import { ShopContext} from '../context';
import { useContext } from "react";

function GoodsItem(props) {
    const {
        mainId: id,
        displayName: name,
        displayType: type,
        displayDescription: description,
        price,
        displayAssets,
        rarity,
    } = props;

    const {addToBasket} = useContext(ShopContext);
    
    return (
        <div className="card" id={id}>
        <div className="card-image">
          <img src={displayAssets[0].full_background} alt={name} />
          
        </div>
        <div className="card-content">
            <span className="card-title">{name}</span>
            <p><b>{rarity.name}</b></p>
            <p>{type}</p>
            <p>{description}</p>
        </div>
        <div className="card-action">
          <button className="btn" onClick={() => addToBasket({
            id, 
            name,
            price 
          })}>Buy</button>
          <span className="right" style={{fontSize: '1.8rem'}}>{price.finalPrice} coins</span>
        </div>
      </div>
    );
}

export {GoodsItem}