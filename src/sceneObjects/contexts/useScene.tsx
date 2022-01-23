import { createContext, ReactNode, RefObject, useCallback, useContext, useMemo, useState } from "react";

interface Context {
  elements: RefObject<HTMLElement>[];
  subscribeElement: (element: RefObject<HTMLElement>) => void;
}

interface Props {
  children: ReactNode;
}

export interface IContextResult {
  elements: RefObject<HTMLElement>[];
  subscribeElement: (element: RefObject<HTMLElement>) => void;
}

const SceneContext = createContext<Context>({} as Context);

export const SceneProvider = ({ children }: Props) => {
  const [elements, setElements] = useState<RefObject<HTMLElement>[]>([]);

  const subscribeElement = useCallback(
    (element: RefObject<HTMLElement>) => {
      setElements([...elements, element]);
    },
    [elements]
  );

  const memoizedValue = useMemo(
    () => ({
      elements,
      subscribeElement,
    }),
    [elements, subscribeElement]
  );

  return <SceneContext.Provider value={memoizedValue}>{children}</SceneContext.Provider>;
};

export const useScene = () => {
  const context = useContext(SceneContext);

  return context;
};
