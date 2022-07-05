import { useEffect, useContext} from 'react';
import {API_URL} from '../config';

import { ShopContext } from '../context';

import {Preloader} from './Preloader';
import {GoodsList} from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import {Alert} from './Alert.jsx';

const API_KEY = process.env.REACT_APP_API_KEY;

function Shop() {
    const { setGoods, order, isBasketShow, alertName, loading} = useContext(ShopContext);


    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                Authorization: API_KEY,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setGoods(data.shop);
            });
    }, []);

    return (
    <main className="container content">
        <Cart quantity={order.length}/>
        {loading ? (
            <Preloader />
        ) : (
            <GoodsList />
        )}
        {isBasketShow && 
            <BasketList />
        }
        {
            alertName && <Alert />
        }
    </main>)
}

export {Shop}