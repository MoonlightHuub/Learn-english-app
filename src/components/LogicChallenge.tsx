import { useEffect, useState } from "react";
import Router from "next/router";
import styles from "../styles/desktop/content.module.css";
import { intros } from "@/data/constants/introChallenge/intro";
import { phrasesJson } from "@/data/phrases/challenges/phrases";
import { frasesJson } from "@/data/Frases/challenges/frases";
import Content from "./Content";

export interface Elements {
  fid: number;
  frag: string;
}

const phraseArray = Object.values(phrasesJson);
const fraseArray = Object.values(frasesJson);
const introJson = intros

function LogicChallenge() {

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
  }, [indexOfFrag]);

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
    if(indexOfFrase === 9){
      EndChallenge()
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
    if (indexOfIntro >= 1) {
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

  const EndChallenge = () => {
    setEndTutorial(true)
  }

  const HandleEndTutorial = () => {
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
        endTutorial={endTutorial}
        intro={intro}
        indexOfIntro={indexOfIntro}
        indexOfFrase={indexOfFrase}
        indexOfFrag={indexOfFrag}
        toggleMenu={toggleMenu}
        isTrue={isTrue}
        intros={introJson}
        Skip={Skip}
        HandleEndTutorial={HandleEndTutorial}
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

export default LogicChallenge;
