import { Canvas } from "@react-three/fiber";
import { useContext } from "react";
import Game from "../Game";
import MovesContext from "../../context/moves";

const ThreeCanvas = () => {
  const { gameId } = useContext(MovesContext);

  return (
    <Canvas camera={{ position: [42, 10, 0], fov: 30 }} className="h-screen">
      <ambientLight intensity={Math.PI / 4} />
      <spotLight
        position={[250, 230, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI / 2}
      />
      <Game key={gameId} />
    </Canvas>
  );
};

export default ThreeCanvas;
