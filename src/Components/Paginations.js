import React from "react";

import { ButtonGroup, Button } from "@material-ui/core";

// Pagination component
const Pagination = (props) => {
  const { current, onChange, count } = props; // Destructuring props object to extract specific properties
  let pageSize = props.size; // Assigning 'size' property of props object to the variable 'pageSize'

  const divisible = count % pageSize === 0; // Checking if 'count' is divisible by 'pageSize'
  const valueToBeAdded = divisible ? 0 : 1; // If not divisible, add 1 to the value, otherwise 0
  let noOfPages = Math.floor(count / pageSize) + valueToBeAdded; // Calculating the number of pages

  const PAGINATION_WIDTH = 2; // Number of elements to show ahead and behind the current element

  // Function to get previous buttons
  const getPrevButtons = (item, PAGINATION_WIDTH) => {
    let prevButtons = [];
    let prevItem = item - 1;
    while (prevItem > 0 && PAGINATION_WIDTH > 0) {
      prevButtons.push(prevItem); // Add previous item to the array
      prevItem--;
      PAGINATION_WIDTH--;
    }
    return prevButtons;
  };

  // Function to get next buttons
  const nextButtons = (item, PAGINATION_WIDTH, noOfPages) => {
    let nextButtons = [];
    while (item < noOfPages && PAGINATION_WIDTH > 0) {
      item++;
      PAGINATION_WIDTH--;
      nextButtons.push(item); // Add next item to the array
    }
    return nextButtons;
  };

  // Generate an array of buttons
  let buttons = [
    ...getPrevButtons(current, PAGINATION_WIDTH).reverse(), // Get previous buttons and reverse the array
    current, // Add the current button
    ...nextButtons(current, PAGINATION_WIDTH, noOfPages), // Get next buttons
  ];

  return (
    <>
      <div className="pagination-wrap">
        <ButtonGroup className="button-wrap">
          {/* Render 'First' button if current is not 1 */}
          {current !== 1 && (
            <Button
              color="default"
              onClick={() => {
                onChange(1);
              }}
            >
              {"First"}
            </Button>
          )}

          {/* Render buttons */}
          {buttons.map((element, index) =>
            element === current ? (
              <Button 
                key={`${index}__ind`}
                style={{ cursor: "auto", backgroundColor: "#1d85c7" }}
              >
                {" "}
                {element}
              </Button>
            ) : (
              <Button
                key={`${index}__ind`}
                color={element === current ? "primary" : "default"}
                onClick={() => {
                  onChange(element);
                }}
              >
                {element}
              </Button>
            )
          )}

          {/* Render 'Last' button if current is not equal to the number of pages */}
          {current !== noOfPages && (
            <Button
              color="default"
              onClick={() => {
                onChange(noOfPages);
              }}
            >
              {"Last"}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </>
  );
};
export default Pagination;
