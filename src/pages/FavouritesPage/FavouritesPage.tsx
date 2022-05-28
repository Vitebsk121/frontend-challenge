import './FavouritesPage.scss';

import React, { useEffect, useState } from 'react';
import CardsList from '../../components/CardsList/CardsList';

type FavouritesProps = {};

const FavouritesPage: React.FC<FavouritesProps> = (props: FavouritesProps) => {
  const [cardData, setCardData] = useState<{ url: string; id: string }[]>([]);

  useEffect(() => {
    const arrOfCards = [];
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (!key) return;
      let card = {
        id: key,
        url: localStorage.getItem(key) || '',
      };
      arrOfCards.push(card);
    }
    setCardData(arrOfCards);
  }, []);

  return (
    <div className="content">
      <div className="wrapper">
        {cardData.length === 0 ? (
          <h3 className="loader">Добавьте котиков в избранное</h3>
        ) : (
          <CardsList cardData={cardData} />
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;
