import { useCallback, useEffect, useState, useMemo } from "react";
import "./App.css";

export default function App() {
  const [value, setValue] = useState(1);
  const [view, setView] = useState(true);

  if (view) {
    return (
      <div>
        <button onClick={() => setView(false)}>hide</button>
        <button onClick={() => setValue((value) => value + 1)}>+1</button>
        <PlanetInfo id={value} />
      </div>
    );
  } else {
    return <button onClick={() => setView(true)}>show</button>;
  }
}

const getPlanet = (id) => {
  return fetch(`https://swapi.dev/api/planets/${id}`)
    .then((response) => response.json())
    .then((data) => data);
};

const useRequest = (request) => {
  const initialState = useMemo(
    () => ({
      data: null,
      loading: true,
      error: null,
    }),
    []
  );

  const [dataState, setDataState] = useState(initialState);
  useEffect(() => {
    setDataState(initialState);
    let canceled = false;
    request()
      .then(
        (data) =>
          !canceled &&
          setDataState({
            data,
            loading: false,
            error: null,
          })
      )
      .catch(
        (error) =>
          !canceled &&
          setDataState({
            data: null,
            loading: false,
            error,
          })
      );
    return () => (canceled = true);
  }, [request, initialState]);

  return dataState;
};

const usePlanetInfo = (id) => {
  const request = useCallback(() => getPlanet(id), [id]);
  return useRequest(request);
};

const PlanetInfo = ({ id }) => {
  const { data, loading, error } = usePlanetInfo(id);
  if (error) return <div>Something is wrong</div>;
  if (loading) return <div>loading...</div>;

  return (
    <div>
      {id} - {data && data.name}
    </div>
  );
};
