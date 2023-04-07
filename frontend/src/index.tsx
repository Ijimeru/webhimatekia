import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
  const [teks, setTeks] = useState("");
  const [value, setValue] = useState(0);
  return (
    <div>
      <h1>Hello, {teks}!</h1>
      <input type="text" onChange={(e) => setTeks(e.target.value)} />
      <button onClick={() => setValue((prev) => prev + 1)}>tambahkan saya</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
