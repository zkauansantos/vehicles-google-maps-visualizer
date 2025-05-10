import { render, renderHook } from "@testing-library/react";

import { useIntersectionObserver } from "../useIntersectionObserver";

const observe = jest.fn();
const disconnect = jest.fn();

beforeAll(() => {
  (global as any).IntersectionObserver = jest.fn(() => ({
    observe,
    disconnect,
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

function TestComponent({
  callback,
  condition = true,
  isToDisconnect = false,
}: {
  callback: () => void;
  condition?: boolean;
  isToDisconnect?: boolean;
}) {
  const { ref } = useIntersectionObserver({
    callback,
    condition,
    isToDisconnect,
  });

  return (
    <div data-testid="observed-element" ref={ref}>
      Observe me
    </div>
  );
}

describe("useIntersectionObserver", () => {
  it("should observe the element", () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} />);

    expect(observe).toHaveBeenCalledTimes(1);
  });

  it("should disconnect observer on unmount", () => {
    const callback = jest.fn();
    const { unmount } = render(<TestComponent callback={callback} />);

    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });

  it("should call callback when intersecting and condition is true", () => {
    const callback = jest.fn();

    (global as any).IntersectionObserver = jest.fn((cb) => {
      cb([{ isIntersecting: true }], {
        disconnect,
      });

      return {
        observe,
        disconnect,
      };
    });

    render(<TestComponent callback={callback} />);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call callback if condition is false", () => {
    const callback = jest.fn();

    (global as any).IntersectionObserver = jest.fn((cb) => {
      cb([{ isIntersecting: true }], {
        disconnect,
      });

      return {
        observe,
        disconnect,
      };
    });

    render(<TestComponent callback={callback} condition={false} />);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should disconnect immediately if isToDisconnect is true", () => {
    const callback = jest.fn();

    let trigger: Function;

    (global as any).IntersectionObserver = jest.fn((cb) => {
      trigger = () => cb([{ isIntersecting: true }], { disconnect });

      return {
        observe,
        disconnect,
      };
    });

    render(<TestComponent callback={callback} isToDisconnect />);

    trigger!();

    expect(disconnect).toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });

  it("should do nothing if ref.current is null", () => {
    const callback = jest.fn();

    const { result, unmount } = renderHook(() =>
      useIntersectionObserver({ callback }),
    );

    (result.current.ref as any).current = null;

    unmount();

    expect(observe).not.toHaveBeenCalled();
    expect(disconnect).not.toHaveBeenCalled();
    expect(callback).not.toHaveBeenCalled();
  });
});
