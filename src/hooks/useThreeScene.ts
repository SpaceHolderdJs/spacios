import { useState } from "react";
import scene from "../utils/scene";

const useThreeScene = () => {
  const [params, setParams] = useState();

  return { scene, setParams };
};

export default useThreeScene;
