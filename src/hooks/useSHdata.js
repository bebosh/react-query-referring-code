import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const addSuperHero = (hero) => {
  return axios.post("http://localhost:4000/superheroes", hero);
};

export const useSuperHeroData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    //cacheTime:5000,
    //staleTime:30000
    //refetchOnMount:false
    //refetchInterval:refetchVar,
    //refetchIntervalInBackground:true
    //enabled:false
    onSuccess,
    onError,
    //   select: (data) => {
    //     const superCapital = data.data.map((hero) => hero.name.toUpperCase());
    //     return superCapital;
    //   },
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    //onSuccess:(data)=>{
    // ----This function forces a new get request ----
    //queryClient.invalidateQueries('super-heroes')
    // ----This function is used to manually take the response of the mutation and append to the results instead of make refetch ----
    // queryClient.setQueryData("super-heroes", (oldQueryData)=>{
    //   return{...oldQueryData, data:[...oldQueryData.data,data.data]}
    // })
    // }
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData("super-heroes", (oldQueryData) => {
        return { ...oldQueryData, data: [...oldQueryData.data, {id:oldQueryData?.data?.length +1, ...newHero}] };
      })
      return{
        previousHeroData
      }
    },
    onError: (_error, _hero, context ) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes")
    },
  });
};
