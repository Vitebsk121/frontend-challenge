import "./MainPage.scss";

import React, {useEffect, useState} from "react";
import CardsList from "../../components/CardsList/CardsList";
import axios from "axios";

type MainPageProps = {};

type TApiData = {
  data: {
    id: string
    url: string
  }[]
}

const MainPage: React.FC<MainPageProps> = (props: MainPageProps) => {
  const [cardData, setCardData] = useState<{url:string, id: string}[]>([]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const fetchData = async (limit: number, page: number) => {
    try {
      axios.defaults.headers.common['x-api-key'] = "a8b46641-6368-48b9-a8cf-7687061155e9";
      let response: TApiData = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:limit, page:page, size:"full" } } );
      setCardData(prev => [...prev, ...response.data]);
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    fetchData(limit, page);
  }, [page])
  return (
    <div className="content">
      <div className="wrapper">
        {cardData.length === 0
          ? (<h3 className='loader'>... загружаем еще котиков ...</h3>)
          : (<CardsList cardData={cardData}/>)
        }
      </div>
    </div>
  );
};

export default MainPage;
