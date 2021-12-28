import { RefObject, useCallback } from "react";
import {
  useAnimationFrame,
  INextAnimationFrameHandler,
} from "./useAnimationFrame";

/*
 * Funções horários do MUV
 *
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

interface IUseGravityProps {
  pixelToMetersFactor?: number;
  stop?: boolean;
  ref: RefObject<HTMLElement>;
}

let initialVelocity = 0;
let initialDistance = 0;

export const useGravity = ({
  pixelToMetersFactor = 100,
  stop = false,
  ref,
}: IUseGravityProps) => {
  const moveY = useCallback(
    (distanceValue: number) => distanceValue * pixelToMetersFactor,
    []
  );

  const loop = ({ deltaTime }: INextAnimationFrameHandler) => {
    // Função horária da posição no MUV => S = So + Vo. t ± (at²)/2
    const finalDistance =
      initialDistance +
      initialVelocity * deltaTime +
      (9.8 * deltaTime ** 2) / 2;

    // Função horária da velocidade no MUV => V = Vo + at
    const finalVelocity = initialVelocity + 9.8 * deltaTime;

    initialDistance = finalDistance;
    initialVelocity = finalVelocity;

    if (ref.current) {
      const reference = ref.current;
      reference.style.top = `${moveY(finalDistance)}px`;
    }
  };

  useAnimationFrame({
    nextAnimationFrameHandler: loop,
    stop,
  });
};
