import { MutableRefObject } from "react";
import { IArgProps } from "../../hooks/useSceneObject";

interface IWithImpulseProps {
  impulse: MutableRefObject<number>;
  time: number;
}

export const withImpulse =
  ({ impulse, time }: IWithImpulseProps) => ({ loop, sceneObject }: IArgProps) => {
    // Função horária da velocidade => V = Vo + at
    const finalVelocity = sceneObject.velocity.y + (impulse.current * loop.deltaTime);

    // Função horária da posição no MUV => S = So + Vo. t ± (at²)/2
    const finalDistance =
      sceneObject.position.y + sceneObject.velocity.y * loop.deltaTime + (impulse.current * loop.deltaTime ** 2) / 2;

    sceneObject.velocity.y = finalVelocity;
    sceneObject.position.y = finalDistance;

    const finalImpulse = impulse.current < 0 ? 0 : impulse.current - (impulse.current * loop.deltaTime) / time;
    impulse.current = finalImpulse;

    console.log(finalImpulse);
  };
