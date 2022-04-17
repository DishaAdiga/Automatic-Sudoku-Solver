"use strict";
var TEST = true;

var SudokuSolver = function(test){
    var solver;

    //convert string to array of strings
    function solve(stringBoard){
        var boardArr = stringBoard.split("");
        //check if board is valid
        if(invalidBoard(boardArr)){
            return false;
        }
        //valid board
        return recursiveSoln(stringBoard);
    }

    //print the result to board
    function printRes(stringBoard){
        var solveBoard = solve(stringBoard);
        console.log(toString(solveBoard.split("")));
        return solveBoard;
    }

    function recursiveSoln(stringBoard){
        var boardArr = stringBoard.split("");
        if(isSolved(boardArr)){
            return boardArr.join("");
        }
        var cellPossibilities = nextPoss(boardArr);
        var nextUnsolvedIndex= cellPossibilities.index;
        var possible = cellPossibilities.choices;
        for(var i=0;i<possible.length;i++){
            boardArr[nextUnsolvedIndex]=possible[i];
            var solved = recursiveSoln(boardArr.join(""));
            if(solved){
                return solved;
            }
        }
        return false;
    }

    function validBoard(boardArr){
        //rows valid
        //columns valid
        //grid valid
        return rowValid(boardArr) && colValid(boardArr) && gridValid(boardArr);
    }

    function rowValid(boardArr){
        //row indices start from 0
        //0-8, 9-17, 18-26...
        return [0,9,18,27,36,45,54,63,72].map(function(i){
            return getRow(boardArr,i); // get rows
        }).reduce(function(validity,row){
            return collectionIsValid(row) && validity; //checks for duplicate elements
        },true);
    }

    function  getRow(boardArr,i){
        //get values at each row
        var start = Math.floor(i/9)*9;
        //return values in all 9 cells of each row
        return boardArr.slice(start, start+9);
    }

    function collectionIsValid(collection)//pass the row
    {
        var count={};
        for(var i=0;i<collection.length; i++){
            if(collection[i]!='-'){
                if(count[collection[i]]===undefined){
                    count[collection[i]]=1;
                }
                else{
                    //duplicate found
                    return false;
                }
            }
        }
        return true;
    }

    function colValid(boardArr){
        //col indices start from 0
        //0-8, 9-17, 18-26...
        return [0,1,2,3,4,5,6,7,8].map(function(i){
            return getCol(boardArr,i); // get rows
        }).reduce(function(validity,row){
            return collectionIsValid(row) && validity; //checks for duplicate elements
        },true);
    }

    function getCol(boardArr,i){
        var start = Math.floor(i%9);
        //return values in all 9 cells of each row
        return [0,1,2,3,4,5,6,7,8].map(function(i){
            //difference between 2 adjacent cells column wise is 9
            return boardArr[start+i*9];
        });

    }

    function gridValid(boardArr){
        //first cell number of every box
        return [0,3,6,27,30,33,54,57,60].map(function(i){
            return getGrid(boardArr,i); // get rows
        }).reduce(function(validity,row){
            return collectionIsValid(row) && validity; //checks for duplicate elements
        },true);
    }

    function getGrid(boardArr,i){
        var col = Math.floor(i/3)%3;
        var row = Math.floor(i/27);
        var start = col*3 + row*27; 
        return [0,1,2,9,10,11,18,19,20].map(function(i){
            return boardArr[start+i];
        });
    }

    

    function isSolved(boardArr){
        for(var i=0;i<boardArr.length;i++){
            if(boardArr[i]==='-'){
                return false;
            }
        }
        return true;
    }

    function nextPoss(boardArr){
        for (var i = 0; i < boardArr.length; i++) {
            if (boardArr[i] === "-") {
              var existingValues = getAllIntersections(boardArr, i);
              var choices = ["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(function (num) {
                return existingValues.indexOf(num) < 0;
              });
              return { index: i, choices: choices };
            }
          }
        }
    function getAllIntersections(boardArr, i) {
        return getRow(boardArr, i).concat(getCol(boardArr, i)).concat(getGrid(boardArr, i));
      }
    
    function invalidBoard(boardArr){
        return !validBoard(boardArr);
    }

    function toString(boardArr) {
        return [0, 9, 18, 27, 36, 45, 54, 63, 72].map(function (i) {
          return getRow(boardArr, i).join(" ");
        }).join("\n");
      }
    
      if (test) {
        // These methods will be exposed publicly when testing is on.
        solver = { 
          solve: solve,
          printRes: printRes,
          recursiveSoln: recursiveSoln,
          invalidBoard: invalidBoard,
          validBoard: validBoard,
          isSolved: isSolved,
          nextPoss: nextPoss,
          getAllIntersections: getAllIntersections,
          rowValid: rowValid,
          getRow: getRow,
          colValid: colValid,
          getCol: getCol,
          gridValid: gridValid,
          getGrid: getGrid,
          collectionIsValid: collectionIsValid,
          toString: toString };
      } else {
        // These will be the only public methods when testing is off.
        solver = { solve: solve,
          printRes: printRes};
      }
    
      return solver;
    }(TEST);


