import { useLocation } from 'react-router-dom';
import Item from '../Item/Item';

function ItemPage() {
    const params = useLocation();
    
    return (
        <Item params={params} />
    )
}

export default ItemPage