import React from "react";

const operations = ["÷", "×", "-", "+", "%"];

// Tip: A hook is a custom function (normal) in js which holds a reusable logic
// Tip: To create a custom hook you always need to add the "use" prefix before the name
const useCalculator = () => {
  // Tip: State is data stored inside our component that can be changed over time
  const [output, setOutput] = React.useState("0"); // Tip: The value returned [getter, setter]
  const [hasResult, setHasResult] = React.useState(false);
  const hasOperation = React.useMemo(() => {
    // Tip: Check if the output contains any operation (e.g. + - / *)
    return !!output.split("").find((char) => operations.includes(char));
  }, [output]);

  const handleOperation = (operation) => {
    console.log(`[Action]: (${operation}) - `, output);

    const lastChar = output[output.length - 1];
    const isLastCharOperation = operations.includes(lastChar);

    // Tip: Check if the latest char in the output has one of the possible operations
    if (isLastCharOperation && lastChar !== operation) {
      const outputWithoutLastOperation = output.slice(0, output.length - 1);
      setOutput(outputWithoutLastOperation + operation); // i.e. "1"+"+" = "1+", i.e. "1" + "/" + "1" = "1/1"
    } else if (!isLastCharOperation) {
      setOutput(output + operation);
    }
  };

  const handleNumber = (number) => {
    console.log(`[Action]: (${number}) - `, output);

    if ((!hasOperation && hasResult) || (output === "0" && !hasResult)) {
      setOutput(number);
      setHasResult(false);
    } else {
      setOutput(output + number);
    }
  };

  const buttons = [
    // Row 1
    {
      name: "C",
      variant: "secondary",
      gridArea: "a1",
      onClick: () => {
        console.log("[Action]: Clear - ", output);
        setOutput("0"); // Tip: Set the state to the initial value
      },
    },
    {
      name: "±",
      variant: "secondary",
      gridArea: "a2",
      onClick: () => {
        // Tip: Split the output in multiple elements i.e. ['20', '30', '5', '2', '5', '100.555']
        const splitedOutput = output.split(/[+|-|÷|×|%]/);
        // Tip: Take the latest number, i.e. '100.555'
        const lastElementInOutput = splitedOutput[splitedOutput.length - 1];

        if (lastElementInOutput) {
          const toggleRegex = /\(+[-]\w+\)/;

          if (toggleRegex.test(lastElementInOutput)) {
            // Tip: Make the last number positive
            const replaceRegex = new RegExp(
              `(.*)\\${lastElementInOutput.replace(")", "\\)")}`
            );
            const newLastElement = lastElementInOutput.slice(
              2,
              lastElementInOutput.length - 1
            );
            setOutput(output.replace(replaceRegex, `$1${newLastElement}`));
          } else {
            // Tip: The regex only takes the last element within the output
            const replaceRegex = new RegExp(`(.*)${lastElementInOutput}`);
            // Tip: Make the last number negative
            const newLastElement = `(-${lastElementInOutput})`;
            // Tip: $1 - keeps the string before the last element
            setOutput(output.replace(replaceRegex, `$1${newLastElement}`));
          }
        }
      },
    },
    {
      name: "%",
      variant: "secondary",
      gridArea: "a3",
      onClick: () => handleOperation("%"),
    },
    {
      name: "÷",
      variant: "primary",
      gridArea: "a4",
      onClick: () => handleOperation("÷"),
    },

    // Row 2
    {
      name: "7",
      variant: "secondary",
      gridArea: "b1",
      onClick: () => handleNumber("7"),
    },
    {
      name: "8",
      variant: "secondary",
      gridArea: "b2",
      onClick: () => handleNumber("8"),
    },
    {
      name: "9",
      variant: "secondary",
      gridArea: "b3",
      onClick: () => handleNumber("9"),
    },
    {
      name: "×",
      variant: "primary",
      gridArea: "b4",
      onClick: () => handleOperation("×"),
    },

    // Row 3
    {
      name: "4",
      variant: "secondary",
      gridArea: "c1",
      onClick: () => handleNumber("4"),
    },
    {
      name: "5",
      variant: "secondary",
      gridArea: "c2",
      onClick: () => handleNumber("5"),
    },
    {
      name: "6",
      variant: "secondary",
      gridArea: "c3",
      onClick: () => handleNumber("6"),
    },
    {
      name: "−",
      variant: "primary",
      gridArea: "c4",
      onClick: () => handleOperation("-"),
    },

    // Row 4
    {
      name: "1",
      variant: "secondary",
      gridArea: "d1",
      onClick: () => handleNumber("1"),
    },
    {
      name: "2",
      variant: "secondary",
      gridArea: "d2",
      onClick: () => handleNumber("2"),
    },
    {
      name: "3",
      variant: "secondary",
      gridArea: "d3",
      onClick: () => handleNumber("3"),
    },
    {
      name: "+",
      variant: "primary",
      gridArea: "d4",
      onClick: () => handleOperation("+"),
    },

    // Row 5
    {
      name: "0",
      variant: "tertiary",
      gridArea: "e1",
      onClick: () => handleNumber("0"),
    },
    {
      name: ".",
      variant: "secondary",
      gridArea: "e2",
      onClick: () => {
        // Tip: Split the output in multiple elements i.e. ['20', '30', '5', '2', '5', '100.555']
        const splitedOutput = output.split(/[+|-|÷|×|%]/);
        // Tip: Take the latest number, i.e. '100.555'
        const lastElementInOutput = splitedOutput[splitedOutput.length - 1];

        // Tip: Add the dot only if the latest number doesn't include it already or is not falsy
        if (lastElementInOutput.includes(".") || !lastElementInOutput) {
          return;
        }
        setOutput(output + ".");
      },
    },
    {
      name: "=",
      variant: "primary",
      gridArea: "e3",
      onClick: () => {
        const newOutput = output
          .replaceAll("%", "/100")
          .replaceAll("÷", "/")
          .replaceAll("×", "*");

        console.log(newOutput);
        const result = eval(newOutput); // Tip: Eval evaluates the JavaScript code given as string and run it
        setOutput(String(result)); // Tip: String constructor is used to convert any type to string
        setHasResult(true);
      },
    },
  ];

  return {
    buttons,
    output,
  };
};

export default useCalculator;
