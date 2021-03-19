import { useRef, useState } from "react";
import "./App.css";
import "./App.scss";
import LightningBolt from "./assets/lightning.svg";

const App = () => {
  const inputFieldRef = useRef();
  const [state, setState] = useState({
    data: "",
  });
  const handleClick = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ zipcode: inputFieldRef.current.value }),
    };
    fetch("http://localhost:5000/current-weather", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        res.data.cod !== "404"
          ? setState({ data: res.data })
          : setState({ data: res.data.message });
      });
  };
  return (
    <div>
      <div className="header">
        <h2>Weather Forcast</h2>
        <img src={LightningBolt} alt="Icon" />
      </div>
      <div className="instructions">
        <p>
          Enter a US zipcode below to get the current weather conditions for
          that area.
        </p>
      </div>
      <div className="zipcodeInput">
        <input
          ref={inputFieldRef}
          type="text"
          placeholder="Enter zipcode.."
          name="zipcode"
        />
        <button onClick={handleClick}>ENTER</button>
      </div>
      <div className="radio-button-section">
        {console.log(state.data)}
        {typeof state.data === "object"
          ? state.data["weather"][0].main
          : state.data}
      </div>
    </div>
  );
};

export default App;
