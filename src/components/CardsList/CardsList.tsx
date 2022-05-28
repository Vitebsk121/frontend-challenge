import "./CardsList.scss";

import React, {useEffect, useState} from "react";
import Like from "../UI/Like";

type CardsListProps = {
  cardData: {url: string, id: string}[]
};

const CardsList: React.FC<CardsListProps> = ({cardData}: CardsListProps) => {
  const [favouritesCards, setFavouritesCards] = useState<{url:string, id: string}[]>([]);

  const addNewFavouritesCard = (card: {url: string, id: string}) => {
    setFavouritesCards(prev => [...prev, card]);
    localStorage.setItem(card.id, card.url);
  }

  const removeFavouritesCard = (card: {url: string, id: string}) => {
    setFavouritesCards(prev => prev.filter(item => item.id !== card.id))
    localStorage.removeItem(card.id)
  }

  const favouritesCardsHandler = (card: {url: string, id: string}) => {
    if(checkLike(card.id)) {
      removeFavouritesCard(card)
    } else {
      addNewFavouritesCard(card);
    }
  }

  useEffect(() => {
    const arrOfCards = [];
    for(let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (!key) return;
      let card = {
        id: key,
        url: localStorage.getItem(key) || '',
      };
      arrOfCards.push(card);
    }
    setFavouritesCards(arrOfCards);
  }, [])

  const checkLike = (cardID: string) => {
    const el = favouritesCards.find(item => item.id === cardID);
    return !!el;
  }


  return (
    <ul className="cards__list">
      {cardData.map(card => (
        <li key={card.id} className="cards__item">
          <figure className="cards__item__wrapper">
            <img src={card.url} alt="" className="card__pic"/>
            <figcaption className="card__controls">
              <Like isActive={checkLike(card.id)} card={card} favouritesCardsHandler={favouritesCardsHandler} />
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
};

export default CardsList;
