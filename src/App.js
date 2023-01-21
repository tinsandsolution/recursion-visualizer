import React, { useState } from 'react';
import './App.css';

function App() {
  const [initialData, setInitialData] = useState("5, 4, 3, 2, 1");
  const [baseCase, setBaseCase] = useState('if (inputArray.length === 0) return 0;');
  const [recursiveCall, setRecursiveCall] = useState('return arr[0] + recursiveCall(arr.slice(1))');

  const turnIntoArray = (rawDataString) => {
    const rawDataArray = rawDataString.split(',');
    // turns that array into a string that looks like [1,2,3,4,5]
    // const dataString = `[${rawDataArray}]`;

    return rawDataArray;
  }

  const waitingToReturn = (rawDataString) => {
    // regex that gets everything in the string after "return" and before ";"

    const regex = /(?<=return).*/;

    // then applies that regex to the string
    const codeline = String(rawDataString.match(regex))

    //the overall goal is to find the index of the parentheses for the recursive call
    //this is a hacky way to do it

      // how to find the index of the first "(" after recursiveCall in rawDataString
      // console.log(codeline.indexOf('recursiveCall'))
      // console.log(codeline.slice(10+13))

      //so we're going to store the index of the recursiveCall in a variable
      const recursiveCallIndex = codeline.indexOf('recursiveCall')

    let indicesOfParentheses = {}
    // for loop for each character in codeline
    for (let i = recursiveCallIndex + 13; i < codeline.length; i++) {
      if (codeline[i] === '(' || codeline[i] === ')') {
        // add the index of that character to the hackyIndexing object
        indicesOfParentheses[i] = codeline[i]
      }

    }
    // now that we have an object containing the indices of the parentheses, we can find the index of the first one
    const firstParenIndex = Object.keys(indicesOfParentheses)[0]
    // to get the last parentheses, it's a bit tricky.
    // we need to basically continue to remove internal pairs until the next one is a close parentheses
    const parens = Object.keys(indicesOfParentheses)
    // console.log(parens)
    let counter = 1
    while (parens.length >= 2 && indicesOfParentheses[parens[1]] !== ")") {
      //we're going to find two adjacent indices that make () and remove them
      //then we'll check again

      let parensString = parens.map((paren) => indicesOfParentheses[paren]).join('')

      //then we'll find the first index of a pair of parentheses
      const firstPairIndex = parensString.indexOf('()')
      // console.log(firstPairIndex)

      //then we'll remove the first pair of parentheses
      parensString = parens.splice(firstPairIndex, 2)
      // console.log(parensString)

      counter += 1
      if (counter > 100) break;
    }
    const secondParenIndex = parens[1]

    // console.log(firstParenIndex, secondParenIndex)
    // console log everything before firstParenIndex
    console.log(codeline.slice(0, firstParenIndex-13))
    // console log everything after secondParenIndex
    console.log(codeline.slice(secondParenIndex).slice(1))

    return codeline.slice(0, firstParenIndex-13) + "..." + codeline.slice(secondParenIndex).slice(1);

  }

  const halfPage = (
    <div className="half-page">
      <h1>Code</h1>
      <h2>Input</h2>
        <textarea
          className='code-input'
          value={initialData}
          onChange={(e) => setInitialData(e.target.value)}
        >
        </textarea>
      <h2>Base Case</h2>
        <textarea
          className='code-input'
          value={baseCase}
          onChange={(e) => setBaseCase(e.target.value)}
        >
          if (inputArray.length === 0) return 0;
        </textarea>
      <h2>Recursive Call</h2>
        <textarea
          className='code-input'
          value={recursiveCall}
          onChange={(e) => setRecursiveCall(e.target.value)}
        >
          return arr[0] + recursiveCall(arr.slice(1));
        </textarea>
    </div>
  )
  const displayRecursion = (
    <div className="half-page">
      <h1>Visualizer</h1>

      {[...turnIntoArray(initialData),"basecasefinal"].map((v,i) => {
        const CSScolor = {paddingLeft: String(3*i) + '%'}

        // {waitingToReturn, }
        if (turnIntoArray(initialData).slice(i).length == 0) {
          return (
            <div style={CSScolor}>
              <h2>Layer {i}</h2>
              inputArray is {`[${turnIntoArray(initialData).slice(i)}]`} <br />
              We have hit the base case, so we return {
                // regex that gets everything in the string after "return" and before ";"
                String(baseCase.match(/(?<=return).*/))
              } <br />
            </div>
          )
        }

        return (
          <div style={CSScolor}>
            <h2>Layer {i}</h2>
            inputArray is {`[${turnIntoArray(initialData).slice(i)}]`} <br />
            we are waiting to return {waitingToReturn(recursiveCall)} <br />
            which is {turnIntoArray(initialData)[i]} plus recursivecall from below<br />
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="main">
      {halfPage}
      {displayRecursion}
    </div>
  );
}

export default App;
