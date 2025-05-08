import { useEffect, useRef } from "react";

interface IUseIntersectionObserverParams {
  callback: () => void;
  condition?: boolean;
  isToDisconnect?: boolean;
}

export function useIntersectionObserver({
  callback,
  condition = true,
  isToDisconnect = false,
}: IUseIntersectionObserverParams) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver((entries, observerInstance) => {
      const { isIntersecting } = entries[0];

      if (isToDisconnect) {
        observerInstance.disconnect();
        return;
      }

      if (isIntersecting && condition) {
        callback();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [callback, condition, isToDisconnect]);

  return {
    ref,
  };
}
