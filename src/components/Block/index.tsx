import { Vector2 } from "../../core/Vector2";

import { useSceneObject, IUseSceneObject } from "../../sceneObjects/hooks/useSceneObject";

import { withBoxCollider } from "../../sceneObjects/scripts/colliders/withBoxCollider";
import { withGravity } from "../../sceneObjects/scripts/environments/withGravity";
import { withImpulse } from "../../sceneObjects/scripts/externalForces/withImpulse";

import { Container } from "./styles";

interface IBlockProps extends IUseSceneObject {
  impulse: Vector2;
  withCollider?: boolean;
}

export const Block = ({ withCollider = false, impulse, ...props }: IBlockProps) => {
  const elementRef = useSceneObject({
    ...props,
    scripts: [
      withGravity(),
      withCollider && withBoxCollider(),
      withImpulse({ impulse, time: 1000 }),
    ],
  });

  return <Container ref={elementRef} />;
};
