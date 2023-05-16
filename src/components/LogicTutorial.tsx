import { useEffect, useState } from "react";
import { phrasesJson } from "@/data/phrases/tutorial/phrases";
import { frasesJson } from "@/data/Frases/tutorial/frases";
import { intros } from "@/data/constants/IntroTutorial/intro";
import endTutorialJson from '../data/constants/endTutorial.json'
import styles from "../styles/desktop/content.module.css";
import  Router  from "next/router";
import Content from "./Content";

export interface Elements {
  fid: number;
  frag: string;
}

const endTutorialText = endTutorialJson
const introJson = intros
const phraseArray = Object.values(phrasesJson);
export const fraseArray = Object.values(frasesJson);

function LogicTutorial() {

  // Variables to handle the render of phrases throught index
  const [indexOfFrag, setIndexOfFrag] = useState(0);
  const [indexOfFrase, setIndexOfFrase] = useState(0);
  const [indexOfIntro, setIndexOfIntro] = useState(0);
  const [showDiv, setShowDiv] = useState(false);

  // Variables for the fragments, phrases to complete and element selected
  const [phraseToComplete, setPhraseToComplete] = useState<Elements[]>([]);
  const [selected, setSelected] = useState<Elements[]>([]);
  const [fragments, setFragments] = useState(phraseArray);

  // Variables to handle the float menu
  const [isTrue, setIsTrue] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [intro, setIntro] = useState(true);
  const [endTutorial, setEndTutorial] = useState(false)

  // used to prevent bug of hydration render
  useEffect(() => {
    AntiBug();
    HandleIntro();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexOfFrase]);

  // Functions to handle the elements savingm from 'Fragments' into 'selected' and pushing into 'Phrase'. Select, Delete and Complete
  const HandleSelectedElement = (id: number) => {
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

  const HandleDeleteElement = (id: number) => {
    const newFragments = fragments.map((arr) =>
      arr.filter((e) => e.fid !== id)
    );
    setFragments(newFragments);
  };

  const HandleCompletePhrase = (id: number) => {
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

  const HandleElements = (id: number) => {
    HandleSelectedElement(id);
    HandleDeleteElement(id);
    HandleCompletePhrase(id);
  };

  // Functions to verify if the phrase is complete and handle the 'sections'.

  function IsInOrder(phrase: Elements[]) {
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

  const HandleIntro = () => {
    if (indexOfFrase == 3) {
      setIntro(true);
      setIndexOfIntro(3);
    }
  };

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
    if(indexOfFrase === 5){
      EndTutorial()
      setIsTrue(false);
      setToggleMenu(false);
    }else{
      setFragments(phraseArray);
      setIndexOfFrag(indexOfFrag + 1);
      setIndexOfFrase(indexOfFrase + 1);
      setPhraseToComplete([]);
      setIsTrue(false);
      setToggleMenu(false);
    }
  };

  const HandleNextIntro = () => {
    if (indexOfIntro >= 2) {
      Skip();
    }else {
      IntroNext();
    }
  };

  const TryAgain = () => {
    setToggleMenu(false);
    setPhraseToComplete([]);
    setFragments(phraseArray);
    setIndexOfFrag(indexOfFrag);
    setIndexOfFrase(indexOfFrase);
  };

  const EndTutorial = () => {
    setEndTutorial(true)
  }

  const HandleEnd = () => {
    Router.push("/")
  }

  // function to prevent bug.

  const AntiBug = () => {
    setShowDiv(false);
    setShowDiv(true);
  };

  return (
    <main className={styles.contentContainer}>
      <Content 
        fraseArray={fraseArray}
        phraseToComplete={phraseToComplete}
        fragments={fragments}
        showDiv={showDiv}
        end={endTutorial}
        intro={intro}
        indexOfIntro={indexOfIntro}
        indexOfFrase={indexOfFrase}
        indexOfFrag={indexOfFrag}
        toggleMenu={toggleMenu}
        isTrue={isTrue}
        intros={introJson}
        endText={endTutorialText}
        Skip={Skip}
        HandleEnd={HandleEnd}
        IntroBack={IntroBack}
        HandleNextIntro={HandleNextIntro}
        Next={Next}
        TryAgain={TryAgain}
        HandleElements={HandleElements}
        IsInOrder={IsInOrder}
      />
    </main>
  );
}

export default LogicTutorial;
