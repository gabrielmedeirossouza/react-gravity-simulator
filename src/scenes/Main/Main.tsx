import { Block } from "../../components/Block";
import { SceneProvider } from "../../contexts/useScene";

export const Main = () => (
  <SceneProvider>
    <Block />
  </SceneProvider>
);
