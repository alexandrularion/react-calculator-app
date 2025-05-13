import { renderHook, act, waitFor } from "@testing-library/react";
import useCalculator from "./use-calculator";

describe("useCalculator", () => {
  it("should start with output '0'", () => {
    const hook = renderHook(() => useCalculator());

    expect(hook.result.current.output).toBe("0");
  });

  it("should update output on number click", () => {
    const hook = renderHook(() => useCalculator());

    act(() => {
      const button = hook.result.current.buttons.find((b) => b.name === "2");
      button.onClick();
    });

    expect(hook.result.current.output).toBe("2");
  });

  it("should build expression correctly", async () => {
    const hook = renderHook(() => useCalculator());

    act(() => {
      hook.result.current.buttons.find((b) => b.name === "8").onClick();
      hook.result.current.buttons.find((b) => b.name === "+").onClick();
      //   hook.result.current.buttons.find((b) => b.name === "9").onClick();
    });

    await waitFor(() => expect(hook.result.current.output).toBe("2+9"));

    // TODO: Fix the onClick

    // act(() => {
    //   hook.result.current.buttons.find((b) => b.name === "=").onClick();
    // });

    // expect(hook.result.current.output).toBe("11");
  });
});
