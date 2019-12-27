import React from 'react';
import '../css/App.css';

function App() {
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
                Remember when
                <span className="noun-blank"></span>
                (noun) used to be
                <span className="adjective-blank"></span>
                (adjective)? Peppridge Farms remembers.
              </p>
            </div>
            <div id="paragraph-2" className="paragraph hidden">
              <p>
                You can't
                <span className="verb-blank"></span>
                (verb), if you don't
                <span className="verb-blank"></span>. (verb)
              </p>
            </div>
            <div id="paragraph-3" className="paragraph hidden">
              <p>
                Brace yourselves.
                <span className="noun-blank"></span>
                (noun) are/is <span className="verb-blank"></span>. (verb)
              </p>
            </div>
            <div id="paragraph-4" className="paragraph hidden">
              <p>
                One does not simply <span className="verb-blank"></span> (verb) the
                <span className="noun-blank"></span>. (noun)
              </p>
            </div>
            <div id="paragraph-5" className="paragraph hidden">
              <p>
                You know what really <span className="verb-blank"></span> (verb) my
                <span className="noun-blank"></span>? (noun)
              </p>
            </div>
            <div id="paragraph-6" className="paragraph hidden">
              <p>
                Be like Bill. When <span className="verb-blank"></span> (verb)
                happens around his <span className="noun-blank"></span> (noun) he
                <span className="verb-blank"></span>. (verb)
              </p>
            </div>
          </div>
          <div className="buttons__container">
            <div className="load__new-button__container">
              <button id="new-lib">Load a New One</button>
            </div>
            <div className="copy-to-clipboard__button__container">
              <button id="copy-to-clipboard__button" className="">
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
        <textarea readonly id="copy-to-clipboard__textarea" className=""></textarea>
      </section>
    </main>
  );
}

export default App;
