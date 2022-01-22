import { Gravity } from "../core/Constants";
import { INextAnimationFrameHandler } from "../hooks/useAnimationFrame";
import { IUsePhysicsResult } from "../hooks/usePhysics";

/*
 * Função horária da velocidade no MUV => V = Vo + at
 *
 * A função horária da velocidade do MUV é uma equação em que a velocidade do móvel é escrita em função do instante de
 * tempo. Essa função é uma equação de 1º grau, ou seja, é a equação de uma reta.
 *
 * V = velocidade final
 * Vo = velocidade inicial
 * a = aceleração
 * t = tempo
 *
 */

export const withGravity =
  () =>
    ({ deltaTime }: INextAnimationFrameHandler, physicsBody: IUsePhysicsResult) => {
      // Função horária da velocidade
      const finalVelocity = physicsBody.velocity.y + Gravity * deltaTime;

      physicsBody.velocity.y = finalVelocity;
    };
