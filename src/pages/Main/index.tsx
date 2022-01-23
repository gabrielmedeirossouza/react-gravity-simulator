import { Block } from "../../components/Block";
import { SceneProvider } from "../../sceneObjects/contexts/useScene";

import {Container} from './Styles'

export const Main = () => (
  <SceneProvider>
    <Container>
      <Block />
    </Container>
  </SceneProvider>
);
