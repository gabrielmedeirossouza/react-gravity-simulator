import { useEffect, useRef } from "react";

import { METER_TO_PIXEL_FACTOR } from "../../constants";
import { useSceneObject } from "../../sceneObjects/hooks/useSceneObject";

import { withBoxCollider } from "../../sceneObjects/scripts/colliders/withBoxCollider";
import { withGravity } from "../../sceneObjects/scripts/environments/withGravity";
import { withImpulse } from "../../sceneObjects/scripts/externalForces/withImpulse";

import { Container } from "./styles";

export const Block = () => {
  const impulse = useRef(15);

  const [elementRef, sceneObject] = useSceneObject(
    withGravity(),
    // withBoxCollider()
    withImpulse({impulse, time: 1000})
    // withCollider(),
    // withPlayerController()
  );

  useEffect(() => {
    sceneObject.position.x = window.innerWidth / 2 / METER_TO_PIXEL_FACTOR;
    sceneObject.position.y = window.innerHeight / 2 / METER_TO_PIXEL_FACTOR * -1;
  }, []);

  return <Container ref={elementRef} />;
};
