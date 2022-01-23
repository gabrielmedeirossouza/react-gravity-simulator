import { GRAVITY } from "../../../core/Constants";
import { IArgProps } from "../../hooks/useSceneObject";

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
 * Função horária da posição no MUV => S = So + Vo. t ± (at²)/2
 *
 * A função horária da posição é a equação usada para determinar a posição de um móvel que descreve um movimento
 * uniformemente variado. Trata-se de uma equação do 2º grau que depende de variáveis como velocidade inicial,
 * posição inicial e aceleração.
 *
 * S = posição final
 * So = posição inicial
 * vo = velocidade inicial
 * t = tempo
 * a = aceleração
 *
 */

export const withGravity =
  () => ({ loop, sceneObject }: IArgProps) => {
    // Função horária da velocidade => V = Vo + at
    const finalVelocity = sceneObject.velocity.y + GRAVITY * loop.deltaTime;

    // Função horária da posição no MUV => S = So + Vo. t ± (at²)/2
    const finalDistance =
      sceneObject.position.y + sceneObject.velocity.y * loop.deltaTime + (GRAVITY * loop.deltaTime ** 2) / 2;

    sceneObject.velocity.y = finalVelocity;
    sceneObject.position.y = finalDistance;
  };
