import { useRef } from "react";
import { Vector2 } from "../core/Vector2";
import { INextAnimationFrameHandler, useAnimationFrame } from "./useAnimationFrame";

export interface IUsePhysicsResult {
  mass: number;
  position: Vector2;
  velocity: Vector2;
  acceleration: Vector2;
}

export const usePhysics = (...args: ((loop: INextAnimationFrameHandler, physicsBody: IUsePhysicsResult) => void)[]) => {
  const mass = useRef(1);
  const position = useRef(new Vector2(0, 0));
  const velocity = useRef(new Vector2(0, 0));
  const acceleration = useRef(new Vector2(0, 0));

  useAnimationFrame((loopProps) => {
    args.forEach((arg) =>
      arg(loopProps, {
        mass: mass.current,
        position: position.current,
        velocity: velocity.current,
        acceleration: acceleration.current,
      })
    );
  });

  return {
    mass: mass.current,
    position: position.current,
    velocity: velocity.current,
    acceleration: acceleration.current,
  };
};
