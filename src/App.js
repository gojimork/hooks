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
const PlanetInfo = ({ id }) => {
  const [planetName, setPlanetName] = useState("");
  useEffect(() => {
    let canceled = false;
    const url = `https://swapi.dev/api/planets/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((body) => !canceled && setPlanetName(body.name));
    return () => (canceled = true);
  }, [id]);
  return (
    <div>
      {id} - {planetName}
    </div>
  );
};
