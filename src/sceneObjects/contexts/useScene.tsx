import { createContext, ReactNode, RefObject, useCallback, useContext, useMemo, useState } from "react";

interface Context {
  elements: any[];
  subscribeElement: (element: RefObject<HTMLElement>) => void;
}

interface Props {
  children: ReactNode;
}

const SceneContext = createContext<Context>({} as Context);

export const SceneProvider = ({ children }: Props) => {
  const [elements, setElements] = useState([] as any[]);

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
