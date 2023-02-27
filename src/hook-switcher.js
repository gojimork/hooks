import { useState } from "react";

const HookSwitcher = () => {
  const [color, setColor] = useState("white");
  const [fontSize, setFontSize] = useState(12);
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: color,
        fontSize: `${fontSize}px`,
      }}
    >
      Hello world!!!
      <button
        onClick={() => {
          setColor("black");
        }}
      >
        Dark
      </button>
      <button
        onClick={() => {
          setColor("grey");
        }}
      >
        Light
      </button>
      <button onClick={() => setFontSize((fontSize) => fontSize + 2)}>+</button>
      <button onClick={() => setFontSize((fontSize) => fontSize - 2)}>-</button>
    </div>
  );
};

export default HookSwitcher;
