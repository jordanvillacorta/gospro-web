import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getShopById, addToFavorites } from '../api/api';

const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);

  useEffect(() => {
    const fetchShop = async () => {
      const response = await getShopById(id);
      setShop(response.data);
    };

    fetchShop();
  }, [id]);

  const handleAddToFavorites = async () => {
    await addToFavorites(id);
    alert('Added to favorites!');
  };

  if (!shop) return <div>Loading...</div>;

  return (
    <div>
      <h1>{shop.name}</h1>
      <p>{shop.address}, {shop.city}, {shop.state}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default ShopDetail;
