import { IWithScripts } from "../../hooks/useSceneObject";

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
  () => ({ element, scene }: IWithScripts) => {
    scene.elements.current.forEach((sceneElement) => {
      if (sceneElement.current && element.current && !element.current.isSameNode(sceneElement.current)) {
        const rect1 = sceneElement.current.getBoundingClientRect();
        const rect2 = element.current.getBoundingClientRect();

        if (
          rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.y + rect1.height > rect2.y
        ) {
          // scene.sceneObject.setCollided(true);
          console.log("colidiu");
          element.current.style.backgroundColor = "red";
        }
      }
    });
  };
