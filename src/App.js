import { React, useState, useEffect } from "react";
import {Score} from '../src/components/Score';
import {
  blank,
  blueCandy,
  greenCandy,
  orangeCandy,
  purple,
  redcandy,
  yellowCandy,
} from "./images/index";
import "./App.css";
export const App = () => {
  const width = 8;
  const colors = [
    blueCandy,
    greenCandy,
    orangeCandy,
    purple,
    redcandy,
    yellowCandy,
  ];
  const [colorArrangments, setColorArrangments] = useState(null);
  const [blockBeingDragged, setBlockBeingDragged] = useState(null);
  const [blockBeingReplaced, setBlockBeingReplaced] = useState(null);
  const [score,setScore] = useState(0);
  const dragStart = (e) => {
    setBlockBeingDragged(e.target);
  };
  const dragDrop = (e) => {
    setBlockBeingReplaced(e.target);
  };
  const dragEnd = () => {
    const draggedBlockId = parseInt(blockBeingDragged.getAttribute("data-id"));
    const replacedBlockId = parseInt(
      blockBeingReplaced.getAttribute("data-id")
    );
    const validMoves = [
      draggedBlockId - 1,
      draggedBlockId + 1,
      draggedBlockId + width,
      draggedBlockId - width,
    ];
    // colorArrangments[replacedBlockId] = blockBeingDragged.getAttribute("src");
    // colorArrangments[draggedBlockId] = blockBeingReplaced.getAttribute("src");
    const isValidMove = validMoves.includes(replacedBlockId);
    const isColumnOfThree = checkForColumnOfThree();
    const isColumnOfFour = checkForColumnOfFour();
    const isRowOfThree = checkForRowOfThree();
    const isRowOfFour = checkForRowOfFour();
    if (
      replacedBlockId &&
      isValidMove
    ) {
      const isColumnOfThree = checkForColumnOfThree();
      const isColumnOfFour = checkForColumnOfFour();
      const isRowOfThree = checkForRowOfThree();
      const isRowOfFour = checkForRowOfFour();
      colorArrangments[replacedBlockId] = blockBeingDragged.getAttribute("src");
      colorArrangments[draggedBlockId] = blockBeingReplaced.getAttribute("src");
      if(!(isColumnOfThree || isColumnOfFour || isRowOfThree || isRowOfFour)){
        if(score >= 2){
          setScore(score-2)
        }else{
          alert('You lose Sorry,you can try again')
          setColorArrangments(null)
          createBoard()
        }
      }
      setBlockBeingDragged(null);
      setBlockBeingReplaced(null);
    }
  };
  const createBoard = () => {
    let arr = [];
    for (let i = 0; i < width * width; i++) {
      let randomInt = Math.floor(Math.random() * colors.length);
      arr[i] = colors[randomInt];
    }
    setColorArrangments(arr);
  };
  const fallingBlocks = () => {
    for (let i = 0; i <= 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && colorArrangments[i] == blank) {
        let randomInt = Math.floor(Math.random() * colors.length);
        colorArrangments[i] = colors[randomInt];
      }
      if (colorArrangments[i + width] == blank) {
        colorArrangments[i + width] = colorArrangments[i];
        colorArrangments[i] = blank;
      }
    }
  };
  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = colorArrangments[i];

      if (
        columnOfThree.every(
          (square) => colorArrangments[square] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => (colorArrangments[square] = blank));
        setScore(score+3)
        return true;
      }
    }
  };
  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfThree = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = colorArrangments[i];
      if (
        columnOfThree.every(
          (square) => colorArrangments[square] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => (colorArrangments[square] = blank));
        setScore(score+4)
        return true;
      }
    }
  };
  const checkForRowOfThree = () => {
    for (let i = 0; i <= 61; i++) {
      const columnOfThree = [i, i + 1, i + 2];
      const isNotValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];
      if (isNotValid.includes(i)) continue;
      const decidedColor = colorArrangments[i];
      if (
        columnOfThree.every(
          (square) => colorArrangments[square] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => (colorArrangments[square] = blank));
        setScore(score+3)
        return true;
      }
    }
  };
  const checkForRowOfFour = () => {
    for (let i = 0; i <= 61; i++) {
      const columnOfThree = [i, i + 1, i + 2, i + 3];
      const isNotValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];
      if (isNotValid.includes(i)) continue;
      const decidedColor = colorArrangments[i];
      if (
        columnOfThree.every(
          (square) => colorArrangments[square] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => (colorArrangments[square] = blank));
        setScore(score+4)
        return true;
      }
    }
  };

  useEffect(() => {
    createBoard();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      checkForRowOfFour();
      fallingBlocks();
      setColorArrangments([...colorArrangments]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfThree,
    checkForColumnOfFour,
    checkForRowOfThree,
    checkForRowOfFour,
    fallingBlocks,
    colorArrangments,
  ]);
  return (
    <div className="wrapper">
      {colorArrangments ? (
        colorArrangments.map((candyColor, index) => (
          <img
            key={index}
            src={candyColor}
            className="cell"
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))
      ) : (
        <></>
      )}
      <Score score={score}/>
    </div>
  );
};

export default App;
