import styles from "./heading.module.css";

// REMINDER: Props is an object with all properties given as attributes to our component
const Heading = (props) => {
  // Tip: We create the class before adding it to our <h1> tag
  const generateClassName = (size) => {
    switch (size) {
      case "sm":
        return `${styles["container"]} ${styles["container--sm"]}`;
      case "md":
        return `${styles["container"]} ${styles["container--md"]}`;
    }
  };

  return (
    // Tip: We use brackets {} to insert JS expression inside JSX
    <h1 style={props.style} className={generateClassName(props.size || "md")}>
      {props.children}
    </h1>
  );
};

export default Heading;
