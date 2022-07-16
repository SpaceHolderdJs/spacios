import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { FlexRow } from "./components/ui/Flex";
import useThreeScene from "./hooks/useThreeScene";

function App() {
  const { scene } = useThreeScene();

  useEffect(() => {
    scene();
  }, [scene]);

  return (
    <FlexRow w="100%" h="100vh" justifyContent="center" alignItems="flex-end">
      {/* <h1 style={{ color: "white" }}>React is awesome</h1> */}
    </FlexRow>
  );
}

export default App;
