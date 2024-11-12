import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getShops } from '../api/api';

const ShopList = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      console.log('this works!')
      // const response = await getShops();
      // setShops(response.data);
    };

    fetchShops();
  }, []);

  return (
    <div>
      <h1>Coffee Shops</h1>
      <ul>
        {shops.map((shop) => (
          <li key={shop.shop_id}>
            <Link to={`/shop/${shop.shop_id}`}>{shop.name}</Link>
            <p>{shop.address}, {shop.city}, {shop.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;