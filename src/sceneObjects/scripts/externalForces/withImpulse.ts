import { IVector2 } from "../../../core/Vector2";
import { IArgProps } from "../../hooks/useSceneObject";

interface IWithImpulseProps {
  impulse: number;
  time: number;
  direction: IVector2;
}

export const withImpulse =
  ({ impulse, time, direction }: IWithImpulseProps) => ({ loop, sceneObject }: IArgProps) => {
    const finalImpulse = loop.time < time ? impulse - (impulse / (time / loop.time)) : 0;

    // Função horária da velocidade => V = Vo + at
    const finalVelocityX = (sceneObject.velocity.x + (finalImpulse * loop.deltaTime)) * direction.x;
    const finalVelocityY = (sceneObject.velocity.y + (finalImpulse * loop.deltaTime)) * direction.y;

    // Função horária da posição no MUV => S = So + Vo. t ± (at²)/2
    const finalDistanceX =
      sceneObject.position.x + sceneObject.velocity.x * loop.deltaTime + (finalImpulse * loop.deltaTime ** 2) / 2;
    const finalDistanceY =
      sceneObject.position.y + sceneObject.velocity.y * loop.deltaTime + (finalImpulse * loop.deltaTime ** 2) / 2;

    sceneObject.velocity.x = finalVelocityX;
    sceneObject.position.x = finalDistanceX;

    sceneObject.velocity.y = finalVelocityY;
    sceneObject.position.y = finalDistanceY;

    console.log(sceneObject.velocity)
  };
