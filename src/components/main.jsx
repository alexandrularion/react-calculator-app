import styles from "./main.module.css";
import Button from "./button";
import Heading from "./heading";
import useCalculator from "../hooks/use-calculator";
import React from "react";

const Main = () => {
  const calculator = useCalculator();

  /*
    Tip: useRef creates a refference to hold a specific value (html element in our case)
    Tip: It doesn't update the component when the value of the reference is changing
  */
  const scrollRef = React.useRef(null);

  /*
   Tip: useEffect is a hook that calls a callback at least once on mounthing and everytime
   when dependency array is changing
  */
  React.useEffect(() => {
    scrollRef.current.scroll({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [calculator.output]);

  return (
    <main className={styles["container"]}>
      {/* Tip: Composition is a design pattern that allows us to combine custom components
      with regular html-code like
    */}
      <header className={styles["container__header"]}>
        <Heading size="sm">Calculator</Heading>
      </header>
      <section className={styles["container__playground"]}>
        <div ref={scrollRef} className={styles["playground__amount"]}>
          <Heading size="md">{calculator.output}</Heading>
        </div>
        <div className={styles["playground__buttons"]}>
          {/* Tip: The lists help us to render multiple elements that have the same structure */}
          {/* Tip: .map method is used to generate our list */}
          {calculator.buttons.map((button, index) => {
            return (
              <Button
                // Tip: Each element should have an unique key
                // Tip: The key is needed by react to identify each element when doing re-renders
                key={`${index}-${button.gridArea}`}
                variant={button.variant}
                style={{ gridArea: button.gridArea }}
                onClick={button.onClick}
              >
                {button.name}
              </Button>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Main;
