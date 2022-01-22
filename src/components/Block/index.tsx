import { useEffect, useRef } from "react";

import { Container } from "./styles";

import { useScene } from "../../contexts/useScene";
import { usePhysics } from "../../hooks/usePhysics";
import { useUpdate } from "../../hooks/useUpdate";

import { withGravity } from "../../scripts/withGravity";

export const Block = () => {
  const scene = useScene();
  const element = useRef<HTMLDivElement>(null);

  const physicsBody = usePhysics(
    withGravity()
    // withCollider(),
  );

  useUpdate(element, physicsBody);

  useEffect(() => {
    scene.subscribeElement(element);
  }, []);

  return <Container ref={element} />;
};
