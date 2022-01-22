import { RefObject } from "react";

import { useAnimationFrame } from "./useAnimationFrame";
import { IUsePhysicsResult } from "./usePhysics";

export const useUpdate = (element: RefObject<HTMLDivElement>, physicsBody: IUsePhysicsResult) => {
  const loop = () => {
    if (element.current) {
      element.current.style.top = `${physicsBody.velocity.y}px`;
    }
  };

  useAnimationFrame(loop);
};
