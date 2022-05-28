import './MainPage.scss';

import React, { useEffect, useRef, useState } from 'react';
import CardsList from '../../components/CardsList/CardsList';
import axios from 'axios';

type MainPageProps = {};

type TApiData = {
  data: {
    id: string;
    url: string;
  }[];
};

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
  const [cardData, setCardData] = useState<{ url: string; id: string }[]>([]);
  const limit = 20;
  const [page, setPage] = useState(1);
  const infinityEl = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const fetchData = async (limit: number, page: number) => {
    try {
      axios.defaults.headers.common['x-api-key'] = 'a8b46641-6368-48b9-a8cf-7687061155e9';
      let response: TApiData = await axios.get('https://api.thecatapi.com/v1/images/search', {
        params: { limit: limit, page: page, size: 'full' },
      });
      setCardData((prev) => [...prev, ...response.data]);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const callback = function (entries: { isIntersecting: any }[]) {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };
    if (infinityEl.current === null) return;
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(infinityEl.current);
  }, []);

  useEffect(() => {
    fetchData(limit, page);
  }, [page]);
  return (
    <div className="content">
      <div className="wrapper">
        <CardsList cardData={cardData} />
        <div ref={infinityEl} className="infinity-scroll__el">
          <h3 className="loader">... загружаем еще котиков ...</h3>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
