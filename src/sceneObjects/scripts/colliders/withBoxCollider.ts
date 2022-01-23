import { IArgProps } from "../../hooks/useSceneObject";

/*
 * Uma das formas mais simples de detecção de colisão é entre dois retângulos alinhados no eixo — ou seja, sem rotação.
 * O algoritmo funciona garantindo que não haja nenhum espaço entre os 4 lados dos retângulos. Qualquer lacuna significa
 * que uma colisão não existe.
 *
 * rect1.x < rect2.x + rect2.width &&
 * rect1.x + rect1.width > rect2.x &&
 * rect1.y < rect2.y + rect2.height &&
 * rect1.y + rect1.height > rect2.y
 */

export const withBoxCollider =
  () => ({ element, scene }: IArgProps) => {
    // console.log(scene);
  };
