import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000");
};

const fetchBigBang = () => {
  return axios.get("http://localhost:4000/bigbang");
};

export const ParallelQueries = () => {
  const { data: superH} = useQuery("super-heroes", fetchSuperHeroes);
  const { data: bigB } = useQuery("bigbang", fetchBigBang);
  return <div>ParallelQueries</div>;
};
