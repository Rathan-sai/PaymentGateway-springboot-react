import { useState } from "react";
import "./App.css";
import UserPage from "./components/UserPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <UserPage />
    </div>
  );
}

export default App;
