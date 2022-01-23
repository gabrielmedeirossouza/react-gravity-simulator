import { Block } from "../../components/Block";
import { SceneProvider } from "../../sceneObjects/contexts/useScene";

export const Main = () => (
  <SceneProvider>
    <Block />
  </SceneProvider>
);
