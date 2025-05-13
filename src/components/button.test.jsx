import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button";

describe("Button component", () => {
  test("render component", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
  test("calls onClick when clicked", async () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click</Button>);

    await userEvent.click(screen.getByText("Click"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("applies correct class for primary variant", () => {
    render(<Button variant="primary">Primary</Button>);

    const button = screen.getByText("Primary");
    expect(button.className).toContain("container");
    expect(button.classList).toContain("container--primary");
  });
  test("uses secondary as default variant", () => {
    render(<Button>Secondary</Button>);

    const button = screen.getByText("Secondary");
    expect(button.className).toContain("container");
    expect(button.className).toContain("container--secondary");
  });
  test("applies correct style if style is set", () => {
    const customStyle = { display: "flex" };

    render(<Button style={customStyle}>Style</Button>);

    const button = screen.getByText("Style");
    expect(button).toHaveStyle("display: flex");
  });
});
