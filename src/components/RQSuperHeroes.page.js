import { useState } from "react";
import {  useAddSuperHeroData, useSuperHeroData } from "../hooks/useSHdata";
import { Link } from "react-router-dom";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
  //const [refetchVar, setRefetchVar] = useState(3000)

  const onSuccess = (data) => {
    console.log("action after successfully fetch data - ", data);

    // if (data.data.length > 3){
    //   setRefetchVar(false)
    // }
  };

  const onError = (error) => {
    console.log("action after error - ", error);
  };

  const { isLoading, data, isError, error, refetch } = useSuperHeroData(
    onSuccess,
    onError
  );

  const {mutate: addHero, isLoading:insertData, isError:insertIsError, error:insertError} = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = {name, alterEgo}
    addHero(hero)
  };

  if (isLoading && insertData) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  if (insertIsError) {
    return <h2>{insertError.message}</h2>;
  }

  return (
    <>
      <h2>RQ Super Heroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>fetch data</button>
      {data?.data.map((hero) => {
        return (
          <div key={hero.id}>
            <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
          </div>
        );
      })}
      {/* {data.map((heroName)=>{
       return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
