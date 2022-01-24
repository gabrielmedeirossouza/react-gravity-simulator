import { Block } from "../../components/Block";
import { Vector2 } from "../../core/Vector2";
import { SceneProvider } from "../../sceneObjects/contexts/useScene";

import { Container } from "./Styles";

export const Main = () => {
  const blockAPosition = new Vector2(
    window.innerWidth / 2,
    window.innerHeight / 2
  );

  const blockBPosition = new Vector2(
    window.innerWidth / 2 + 150,
    window.innerHeight / 2
  );


  return (
    <SceneProvider>
      <Container>
        <Block
          impulse={new Vector2(0, 20)}
          position={blockAPosition}
        />
  
        <Block
          impulse={new Vector2(-15, 20)}
          position={blockBPosition}
          withCollider
        />
      </Container>
    </SceneProvider>
  );
}


