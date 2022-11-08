import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { shopActions } from '../../core/slices/shopSlice';

function Counter({ styles }) {
    const dispatch = useDispatch();
    const shop = useSelector(state => state._shop);
    const counter = useSelector(state => state._shop);

    return (
        <div className={styles}>
            <button onClick={() => dispatch(shopActions.Counter("increment"))}>+</button>
            <p>{counter.itemsToBuyCounter}</p>
            <button onClick={() => dispatch(shopActions.Counter("decrement"))}>−</button>
        </div>
    )
}

export default Counter