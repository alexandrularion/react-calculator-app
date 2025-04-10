import styles from "./button.module.css";

// Tip: The name of the function should always start with uppercase letter (B)
// Tip: Any component can have props (properties) - always an object - one single parameter
const Button = (props) => {
  //  Tip: We can write as many functions as we need inside our component
  const generateClassName = (variant) => {
    switch (variant) {
      case "primary":
        return `${styles["container"]} ${styles["container--primary"]}`;
      case "secondary":
        return `${styles["container"]} ${styles["container--secondary"]}`;
      case "tertiary":
        return `${styles["container"]} ${styles["container--tertiary"]}`;
    }
  };

  // Tip: A component should always return some JSX content that will be displayed in browser
  return (
    // Tip: JSX (JavaScript XML) - the code is HTML look alike
    // Tip: You can insert JavaScript code within a pair of brackets {}
    <button
      style={props.style}
      className={generateClassName(props.variant || "secondary")}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
