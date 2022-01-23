import { useEffect } from "react";
import { METER_TO_PIXEL_FACTOR } from "../../constants";
import { useSceneObject } from "../../sceneObjects/hooks/useSceneObject";
import { withGravity } from "../../sceneObjects/scripts/withGravity";

import { Container } from "./styles";

export const Block = () => {
  const [elementRef, sceneObject] = useSceneObject(
    withGravity()
    // withCollider(),
    // withPlayerController()
  );

  useEffect(() => {
    sceneObject.position.x = window.innerWidth / 2 / METER_TO_PIXEL_FACTOR;
  }, [sceneObject]);

  return <Container ref={elementRef} />;
};
