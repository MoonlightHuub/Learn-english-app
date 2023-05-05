import { frasesJson } from "@/data/constants/frases";
import styles from "../../styles/desktop/Tutorial/Tutorial.module.css";
import { phrasesJson } from "@/data/constants/shortcuts";
import { useState, useEffect } from "react";

interface Elements{
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
    setIndexOfFrase( indexOfFrase + 1 );
  };
  const handleClickPrev = () => {
    setIndexOfFrag(0);
    setIndexOfFrase(0);
  };

  const handleDeleteElement = (id: number) => {
    const newElements = elements.map((arr) => arr.filter((e) => e.fid !== id ));
    setElements(newElements)
  };
  const handleCompletePhrase = () => {
    // funcion que envie el elemento de selected al array Phrase
    
  };

  const handleSelectedElement = (id: number) => {
    // funcion que guarda el elemento seleccionado
    setSelected([])
    setSelected((prevSelected: Elements[]) => {
      const elementToAdd = elements.find((arr) => arr.some((e) => e.fid === id))?.find((e) => e.fid === id);
      if (elementToAdd) {
        return [...prevSelected, elementToAdd];
      }
      return prevSelected;
    });
  }

  const handleElements = (id: number) => {
    handleDeleteElement(id);
    handleSelectedElement(id);
    handleCompletePhrase();
  }

  useEffect(() => {
    setShowDiv(false)
    setShowDiv(true)
  }, [indexOfFrag]);

  return (
    <section className={styles.contentContainer}>
      <div>{selected.map((e) => (
        <h1>{e.frag}</h1>
      ))}</div>
      <div className={styles.fraseContainer}>
        {fraseArray[indexOfFrase].map((e, i) => (
          <div key={i}>
            <h1>{e.frase}</h1>
          </div>
        ))}
      </div>
      <div className={styles.phraseFrags}>
        {phrase[indexOfFrag]?.map((e: Elements, i: number) => (
          <div key={i}>
            <h1 className={styles.frags}>
              {e.frag}
            </h1>
          </div>
        ))}
      </div>
      <div className={styles.fragsContainer}>
        {showDiv &&
          elements[indexOfFrag].sort(() => Math.random() - 0.5).map((frag, i) => (
              <div
                className={styles.frags}
                key={i}
                onClick={() => handleElements(frag.fid)}
              >
                <h1>{frag.frag}</h1>
              </div>
            ))}
      </div>
      <br />
        <button onClick={handleClickPrev}> Prev </button>
      <span>
        <button onClick={handleClickNext}> Next </button>
      </span>
      <span><h1>{indexOfFrag}</h1></span>
    </section>
  );
}

export default Content;
