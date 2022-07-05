import { useContext, useEffect } from 'react';
import { ShopContext } from '../context';

function Alert() {
    const {
        alertName,
        closeAlert 
    } = useContext(ShopContext);

    useEffect(() => {
        const timerId = setTimeout(closeAlert, 3000);

        return () => {
            clearTimeout(timerId);
        };
    }, [alertName]);


    return(
        <div id="toast-container">
            <div className="toast">{alertName} added to basket</div>
        </div>
    )
}

export {Alert}