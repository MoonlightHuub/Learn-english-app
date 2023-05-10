import { frasesJson } from "@/data/Frases/frases";
import styles from "../../styles/desktop/Tutorial/Tutorial.module.css";
import { phrasesJson } from "@/data/phrases/phrases";
import { intros } from "@/data/constants/IntroTutorial/intro";
import { useState, useEffect } from "react";

interface Elements {
  fid?: number;
  frag?: string;
}

function Content() {
  const phraseArray = Object.values(phrasesJson);
  const fraseArray = Object.values(frasesJson);

  // Variables to handle the render of phrases throught index
  const [indexOfFrag, setIndexOfFrag] = useState(0);
  const [indexOfFrase, setIndexOfFrase] = useState(0);
  const [indexOfIntro, setIndexOfIntro] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
  const [showButton, setShowButton] = useState(false);
  // Variables for the fragments, phrases to complete and element selected
  const [phraseToComplete, setPhraseToComplete] = useState<Elements[]>([]);
  const [selected, setSelected] = useState<Elements[]>([]);
  const [fragments, setFragments] = useState(phraseArray);
  // Variables to handle the float menu
  const [isTrue, setIsTrue] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [intro, setIntro] = useState(true);

  // used to prevent bug of hydration render

  useEffect(() => {
    setShowDiv(false);
    setShowDiv(true);
  }, [indexOfFrag]);

  // Functions to handle the elements savingm from 'Fragments' into 'selected' and pushing into 'Phrase'. Select, Delete and Complete

  const handleSelectedElement = (id: number) => {
    setSelected([]);
    setSelected((prevSelected: Elements[]) => {
      const elementToAdd = fragments
        .find((arr) => arr.some((e) => e.fid === id))
        ?.find((e) => e.fid === id);
      if (elementToAdd) {
        return [...prevSelected, elementToAdd];
      }
      return prevSelected;
    });
  };

  const handleDeleteElement = (id: number) => {
    const newFragments = fragments.map((arr) =>
      arr.filter((e) => e.fid !== id)
    );
    setFragments(newFragments);
  };

  const handleCompletePhrase = (id: number) => {
    setPhraseToComplete((prev: Elements[]) => {
      const elementToMove = fragments
        .find((arr) => arr.some((e) => e.fid === id))
        ?.find((e) => e.fid === id);

      if (elementToMove) {
        return [...prev, elementToMove];
      }
      return prev;
    });
  };

  const handleElements = (id: number) => {
    handleSelectedElement(id);
    handleDeleteElement(id);
    handleCompletePhrase(id);
  };

  // Functions to verify if the phrase is complete and handle the 'sections'.

  function isInOrder(phrase: Elements[]) {
    let isOrder = true;

    for (let i = 1; i < phrase.length; i++) {
      if (
        phrase.length < phraseArray[indexOfFrag].length ||
        phrase[i]?.fid! <= phrase[i - 1]?.fid!
      ) {
        isOrder = false;
        setIsTrue(false);
        setToggleMenu(true);
        break;
      } else {
        setIsTrue(true);
        setToggleMenu(true);
      }
    }
  }

  const Skip = () => {
    setIntro(false);
  };

  const IntroNext = () => {
    setIndexOfIntro(indexOfIntro + 1);
  };

  const IntroBack = () => {
    setIndexOfIntro(indexOfIntro - 1);
  };

  const Next = () => {
    setFragments(phraseArray);
    setIndexOfFrag(indexOfFrag + 1);
    setIndexOfFrase(indexOfFrase + 1);
    setPhraseToComplete([]);
    setIsTrue(false);
    setToggleMenu(false);
  };

  const TryAgain = () => {
    setToggleMenu(false);
    setPhraseToComplete([]);
    setFragments(phraseArray);
    setIndexOfFrag(indexOfFrag);
    setIndexOfFrase(indexOfFrase);
  };

  return (
    <section className={styles.contentContainer}>
      {intro && (
        <div className={styles.menuContainer}>
          <div className={styles.tutorialIntro}>
            <div className={styles.introContainer}>
              <div>
                <img src="../../Arkie.png" alt="Arkie" className={styles.arkieIntro} />
              </div>
              <div>
                {intros[indexOfIntro].map((e) => (
                  <p className={styles.text}>
                    {e.text}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.buttonsContainer}>
              <button onClick={Skip} className={styles.buttonIntro}>Skip</button>
              <div>
                <span>
                  <span>
                    {indexOfIntro > 0 && (
                      <button onClick={IntroBack} className={styles.buttonIntro}>Back</button>
                    )}
                  </span>
                  <span>
                    <button onClick={indexOfIntro !== 2 ? IntroNext : Skip} className={styles.buttonIntro}>
                      {indexOfIntro !== 2 ? 'Next' : 'Finish'}
                    </button>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {toggleMenu && (
        <div className={styles.menuContainer}>
          <div className={styles.winOrFail}>
            <div className={styles.containerTextWoF} style={isTrue ? {backgroundColor: "rgba(0, 255, 0, .5)"} : {backgroundColor: "rgba(255, 0, 0, .5)"}}>
              <h2
                className={styles.textWoF}
              >
                {isTrue
                  ? "Perfecto! completaste correctamente la frase."
                  : "Intentalo Otra vez. No te rindas!"}
              </h2>
            </div>
            <div className={styles.imageContainer}>
              <img src="../../Arkie.png" alt="Arkie" className={styles.arkie} />
            </div>
            <div>
              <button onClick={isTrue ? Next : TryAgain} className={styles.menuButton}>
                {isTrue ? "Next" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}
      <section className={styles.gameContainer}>
        <div className={styles.fraseContainer}>
          {fraseArray[indexOfFrase].map((e, i) => (
            <div key={i}>
              <h1>{e.frase}</h1>
            </div>
          ))}
        </div>
        <div className={styles.phraseFrags}>
          {phraseToComplete?.map((e: Elements, i: number) => (
            <div key={i} className={styles.frags}>
              <h1>{e.frag}</h1>
            </div>
          ))}
        </div>
        <div className={styles.fragsContainer}>
          {showDiv &&
            fragments[indexOfFrag]
              .sort(() => Math.random() - 0.5)
              .map((frag, i) => (
                <div
                  className={styles.frags}
                  key={i}
                  onClick={() => handleElements(frag.fid)}
                >
                  <h1>{frag.frag}</h1>
                </div>
              ))}
        </div>
        <div>
          <button
            onClick={() => isInOrder(phraseToComplete)}
            className={styles.button}
          >
            Comprobar
          </button>
        </div>
      </section>
    </section>
  );
}

export default Content;