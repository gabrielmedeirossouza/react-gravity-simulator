import { useEffect, useRef } from "react";

import { METER_TO_PIXEL_FACTOR } from "../../constants";
import { Vector2 } from "../../core/Vector2";
import { useSceneObject } from "../../sceneObjects/hooks/useSceneObject";

import { withBoxCollider } from "../../sceneObjects/scripts/colliders/withBoxCollider";
import { withGravity } from "../../sceneObjects/scripts/environments/withGravity";
import { withImpulse } from "../../sceneObjects/scripts/externalForces/withImpulse";

import { Container } from "./styles";

interface IBlockProps {
  position: Vector2;
  impulse: Vector2;
  time: number;
}

export const Block = ({ impulse, time, position }: IBlockProps) => {
  const [elementRef, sceneObject] = useSceneObject(
    withGravity(),
    // withBoxCollider()
    withImpulse({ impulse, time })
  );

  useEffect(() => {
    sceneObject.position.x = position.x / METER_TO_PIXEL_FACTOR;
    sceneObject.position.y = (position.y / METER_TO_PIXEL_FACTOR) * -1;
  }, []);

  return <Container ref={elementRef} />;
};
