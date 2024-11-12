import { useState, useEffect } from 'react';
import { getFavorites } from '../api/api';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      console.log('this works!')
      // const response = await getFavorites();
      // setFavorites(response.data);
    };

    fetchFavorites();
  }, []);

  return (
    <div style={{
      backgroundColor: '#623b35',
      color: 'white',
      height: '100vh', // 100% of viewport height
      width: '100vw', // 100% of viewport width
      display: 'flex', // Aligns items in the center
      flexDirection: 'column', // Stacks items vertically
      justifyContent: 'center', // Centers items vertically
      alignItems: 'center', // Centers items horizontally
    }}>
      <div>Your Favorite Shops</div>
      <ul>
        {favorites.map((shop) => (
          <li key={shop.shop_id}>{shop.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;