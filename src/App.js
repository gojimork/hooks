import { useEffect, useState } from "react";
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

const usePlanetInfo = (id) => {
  const [planetName, setPlanetName] = useState("");
  useEffect(() => {
    let canceled = false;
    fetch(`https://swapi.dev/api/planets/${id}`)
      .then((response) => response.json())
      .then((body) => !canceled && setPlanetName(body.name));
    return () => (canceled = true);
  }, [id]);

  return planetName;
};

const PlanetInfo = ({ id }) => {
  const planetName = usePlanetInfo(id);
  return (
    <div>
      {id} - {planetName}
    </div>
  );
};
