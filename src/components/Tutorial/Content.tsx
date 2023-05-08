import { frasesJson } from "@/data/constants/frases";
import styles from "../../styles/desktop/Tutorial/Tutorial.module.css";
import stylesbutton from "../../styles/desktop/Tutorial/buttons.module.css";
import { phrasesJson } from "@/data/constants/shortcuts";
import { useState, useEffect } from "react";

interface Elements {
  fid?: number;
  frag?: string;
}

function Content() {
  const phraseArray = Object.values(phrasesJson);
  const fraseArray = Object.values(frasesJson);

  const [indexOfFrag, setIndexOfFrag] = useState(0);
  const [indexOfFrase, setIndexOfFrase] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
  // frase a completar
  const [phrase, setPhrase] = useState<Elements[]>([]);
  // elemento seleccionado
  const [selected, setSelected] = useState<Elements[]>([]);
  // fragmentos de las frases
  const [elements, setElements] = useState(phraseArray);

  const handleClickNext = () => {
    setElements(phraseArray);
    setIndexOfFrag(indexOfFrag + 1);
    setIndexOfFrase(indexOfFrase + 1);
    setPhrase([]);
  };
  const handleClickPrev = () => {
    setIndexOfFrag(0);
    setIndexOfFrase(0);
    setPhrase([]);
  };

  const handleDeleteElement = (id: number) => {
    const newElements = elements.map((arr) => arr.filter((e) => e.fid !== id));
    setElements(newElements);
  };
  const handleCompletePhrase = (id: number) => {
    // funcion que envie el elemento de selected al array Phrase
    setPhrase((prev: Elements[]) => {
      const elementToMove = elements
        .find((arr) => arr.some((e) => e.fid === id))
        ?.find((e) => e.fid === id);

      if (elementToMove) {
        return [...prev, elementToMove];
      }
      return prev;
    });
  };

  const handleSelectedElement = (id: number) => {
    // funcion que guarda el elemento seleccionado
    setSelected([]);
    setSelected((prevSelected: Elements[]) => {
      const elementToAdd = elements
        .find((arr) => arr.some((e) => e.fid === id))
        ?.find((e) => e.fid === id);
      if (elementToAdd) {
        return [...prevSelected, elementToAdd];
      }
      return prevSelected;
    });
  };

  const handleElements = (id: number) => {
    handleDeleteElement(id);
    handleSelectedElement(id);
    handleCompletePhrase(id);
  };

  useEffect(() => {
    setShowDiv(false);
    setShowDiv(true);
  }, [indexOfFrag]);

  return (
    <section className={styles.contentContainer}>
      <section className={styles.gameContainer}>
        <div className={styles.fraseContainer}>
          {fraseArray[indexOfFrase].map((e, i) => (
            <div key={i}>
              <h1>{e.frase}</h1>
            </div>
          ))}
        </div>
        <div className={styles.phraseFrags}>
          {phrase?.map((e: Elements, i: number) => (
            <div key={i} className={styles.frags}>
              <h1>{e.frag}</h1>
            </div>
          ))}
        </div>
        <div className={styles.fragsContainer}>
          {showDiv && elements[indexOfFrag].sort(() => Math.random() - 0.5).map((frag, i) => (
            <div
              className={styles.frags}
              key={i}
              onClick={() => handleElements(frag.fid)}
            >
              <h1>{frag.frag}</h1>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Content;
