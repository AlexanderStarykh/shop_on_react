import {useState, useEffect} from 'react';
import {API_URL} from '../config';


import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import {Alert} from './Alert.jsx';

const API_KEY = process.env.REACT_APP_API_KEY;

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');


    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            (orderItem) => orderItem.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
            ...item,
            quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    };
                } else {
                    return orderItem;
                }
            });

            setOrder(newOrder);
        }
        setAlertName(item.name);
    };

    const closeAlert = () => {
        setAlertName('');
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((el) => el.id !== itemId);
        setOrder(newOrder);
    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const incrQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity + 1;
                return {
                    ...el,
                    quantity: newQuantity,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    const decrQuantity = (itemId) => {
        const newOrder = order.map((el) => {
            if (el.id === itemId) {
                const newQuantity = el.quantity - 1;
                return {
                    ...el,
                    quantity: newQuantity >= 0 ? newQuantity : 0,
                };
            } else {
                return el;
            }
        });
        setOrder(newOrder);
    };

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.shop && setGoods(data.shop);
                setLoading(false);
                console.log(goods);
            });
    }, []);

    return (
    <main className="container content">
        <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
        {loading ? (
            <Preloader />
        ) : (
            <GoodsList goods={goods} addToBasket={addToBasket}/>
        )}
        {isBasketShow && 
            <BasketList 
                order={order} 
                handleBasketShow={handleBasketShow} 
                removeFromBasket={removeFromBasket}
                incrQuantity={incrQuantity}
                decrQuantity={decrQuantity}
            />
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert}/>
        }
    </main>)
}

export {Shop}