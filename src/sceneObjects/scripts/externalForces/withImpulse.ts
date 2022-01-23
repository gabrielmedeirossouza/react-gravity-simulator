import { IVector2 } from "../../../core/Vector2";
import { IArgProps } from "../../hooks/useSceneObject";

interface IWithImpulseProps {
  impulse: IVector2;
  time: number;
}

export const withImpulse =
  ({ impulse, time }: IWithImpulseProps) => ({ loop, sceneObject }: IArgProps) => {
    const finalImpulseX = loop.time < time ? impulse.x - impulse.x / (time / loop.time) : 0;
    const finalImpulseY = loop.time < time ? impulse.y - impulse.y / (time / loop.time) : 0;

    // Função horária da velocidade => V = Vo + at
    const finalVelocityX = sceneObject.velocity.x + finalImpulseX * loop.deltaTime;
    const finalVelocityY = sceneObject.velocity.y + finalImpulseY * loop.deltaTime;

    // Função horária da posição no MUV => S = So + Vo. t ± (at²)/2
    const finalDistanceX =
      sceneObject.position.x + sceneObject.velocity.x * loop.deltaTime + (finalImpulseX * loop.deltaTime ** 2) / 2;
    const finalDistanceY =
      sceneObject.position.y + sceneObject.velocity.y * loop.deltaTime + (finalImpulseY * loop.deltaTime ** 2) / 2;

    sceneObject.velocity.x = finalVelocityX;
    sceneObject.position.x = finalDistanceX;

    sceneObject.velocity.y = finalVelocityY;
    sceneObject.position.y = finalDistanceY;
  };
