import React, { useEffect } from 'react';
import { generateRandomNumber, generateUniqueRandomNumber } from './generateRandomNumber';
import { deleteContent } from './deleteContent';
import { copyToClipboard } from './copyToClipboard';
import '../css/App.css';

const numberOfLibs = 6;
let chosenLib;
let chosenLibText;
let response;
let randomNumber = generateRandomNumber();

const App = () => {
  useEffect(() => 
  {
    return displayLib(randomNumber);
  }
  , []);

  return (
    <main>
      <section className="section-home">
        <div className="page__container">
          <div className="title__container">
            <div>
              <p className="heading-primary--main">Random Mad Libs</p>
            </div>
            <div>
              <p className="heading-primary--sub">
                (This sentence is not meant to be taken seriously)
              </p>
            </div>
          </div>
          <div className="sentence__container">
            <div id="paragraph-1" className="paragraph hidden">
              <p>
                Remember when <span className="noun-blank"></span> (noun) 
                used to be <span className="adjective-blank"></span> (adjective)? Peppridge Farms remembers.
              </p>
            </div>
            <div id="paragraph-2" className="paragraph hidden">
              <p>
                You can't <span className="verb-blank"></span> (verb), 
                if you don't <span className="verb-blank"></span>. (verb)
              </p>
            </div>
            <div id="paragraph-3" className="paragraph hidden">
              <p>
                Brace yourselves. <span className="noun-blank"></span> (noun) 
                are/is <span className="verb-blank"></span>. (verb)
              </p>
            </div>
            <div id="paragraph-4" className="paragraph hidden">
              <p>
                One does not simply <span className="verb-blank"></span> (verb) 
                the <span className="noun-blank"></span>. (noun)
              </p>
            </div>
            <div id="paragraph-5" className="paragraph hidden">
              <p>
                You know what really <span className="verb-blank"></span> (verb) my <span className="noun-blank"></span>? (noun)
              </p>
            </div>
            <div id="paragraph-6" className="paragraph hidden">
              <p>
                Be like Bill. When <span className="verb-blank"></span> (verb)
                happens around his <span className="noun-blank"></span> (noun) 
                he <span className="verb-blank"></span>. (verb)
              </p>
            </div>
          </div>
          <div className="buttons__container">
            <div className="load__new-button__container">
              <button id="new-lib" onClick={() => generateNewLib()}>Load a New One</button>
            </div>
            <div className="copy-to-clipboard__button__container">
              <button id="copy-to-clipboard__button" onClick={() => copyToClipboard(chosenLibText)}>
                Copy to Clipboard
              </button>
              <div id="copy-to-clipboard__clicked-pop-up" className="hidden">
                <p>
                  Copied
                </p>
              </div>
            </div>
          </div>
        </div>
        <textarea readOnly id="copy-to-clipboard__textarea" className=""></textarea>
      </section>
    </main>
  );
}

// new Lib Button functionality
const generateNewLib = () => {
  // hide old one
  chosenLib.classList.remove("shown");
  chosenLib.className += " hidden";

  let nounBlanks = chosenLib.getElementsByClassName("noun-blank");
  let verbBlanks = chosenLib.getElementsByClassName("verb-blank");
  let adjectiveBlanks = chosenLib.getElementsByClassName("adjective-blank");

  // delete content of previous sentence
  deleteContent(nounBlanks);
  deleteContent(verbBlanks);
  deleteContent(adjectiveBlanks);

  // display new one
  displayLib(
    generateUniqueRandomNumber(
      randomNumber,
      Math.ceil(Math.random() * numberOfLibs)
    )
  );
}

const displayLib = (randomNumber) => {
  // random value is from 1 to numberOfLibs, anything is compared to -1;
  let newRandomNumber = generateUniqueRandomNumber(
    randomNumber,
    Math.ceil(Math.random() * numberOfLibs)
  );
  randomNumber = newRandomNumber;

  // randomly chooses html element based on id
  chosenLib = document.getElementById(`paragraph-${randomNumber}`);
  
  // display chosen element
  chosenLib.classList.remove("hidden");
  chosenLib.className += " shown";

  // finds elements by their partsOfSpeech
  let nounBlanks = chosenLib.getElementsByClassName("noun-blank");
  let verbBlanks = chosenLib.getElementsByClassName("verb-blank");
  let adjectiveBlanks = chosenLib.getElementsByClassName("adjective-blank");

  iterateBlanks(nounBlanks, verbBlanks, adjectiveBlanks);
}

const fetchWord = (partOfSpeech, blanks, i) => {
  response = fetch(
    `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=${partOfSpeech}&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then(response => {
      return response.json();
    })
    .then(data => (response = data.word))
    .then(() => {
      if (partOfSpeech === "noun") {
        const noun = document.createElement("span");
        noun.innerHTML += response;
        blanks.item(i).appendChild(noun);
      }

      if (partOfSpeech === "verb") {
        const verb = document.createElement("span");
        verb.innerHTML += response;
        blanks.item(i).appendChild(verb);
      }

      if (partOfSpeech === "adjective") {
        const adjective = document.createElement("span");
        adjective.innerHTML += response;
        blanks.item(i).appendChild(adjective);
      }
    })
    .then(() => {
      // extract text for copyToClipboard functionality
      chosenLibText = chosenLib.getElementsByTagName('p').item(0).innerText;
    })
    .catch(err => {
      console.log(err);
    });
};

const iterateBlanks = (nounBlanks, verbBlanks, adjectiveBlanks) => {
  for (let i = 0; i < nounBlanks.length; i++) {
    fetchWord("noun", nounBlanks, i);
  }

  for (let i = 0; i < verbBlanks.length; i++) {
    fetchWord("verb", verbBlanks, i);
  }

  for (let i = 0; i < adjectiveBlanks.length; i++) {
    fetchWord("adjective", adjectiveBlanks, i);
  }
};

export default App;
