import { Block } from "../../components/Block";
import { Vector2 } from "../../core/Vector2";
import { SceneProvider } from "../../sceneObjects/contexts/useScene";

import { Container } from "./Styles";

export const Main = () => (
  <SceneProvider>
    <Container>
      <Block
        impulse={new Vector2(-15, 15)}
        position={new Vector2(window.innerWidth / 2, window.innerHeight / 2)}
        time={1000}
      />

      <Block
        impulse={new Vector2(2, 15)}
        position={new Vector2(window.innerWidth / 2 + 150, window.innerHeight / 2)}
        time={1500}
      />
    </Container>
  </SceneProvider>
);
