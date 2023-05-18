import Image from "next/image";
import styles from "../styles/desktop/content.module.css";
import mobileStyles from '../styles/mobile/contentMobile.module.css'
import { Elements } from "./LogicTutorial";
import Timer from "./Timer";
import {SetStateAction, useState, useEffect} from "react"
import Router  from "next/router";

type FraseArray = {
  frase: string
}[][];

type Fragments = {
  fid: number
  frag: string
}[][];

type Intros = {
  text: string
}[][];

type Text ={
  text: string
}[];

type Props = {
  fraseArray: FraseArray
  phraseToComplete: Elements[]
  fragments: Fragments
  showDiv: boolean
  end: boolean
  intro: boolean
  indexOfIntro: number
  indexOfFrase: number
  indexOfFrag: number
  toggleMenu: boolean
  isTrue: boolean
  intros: Intros
  endText: Text
  showTimer?: boolean
  start?: boolean
  timerRef?: React.RefObject<HTMLDivElement>
  HandleEnd: () => void
  Skip: () => void
  IntroBack: () => void
  HandleNextIntro: () => void
  Next: () => void
  TryAgain: () => void
  HandleElements: (id: number) => void
  IsInOrder: (phrase: Elements[]) => void
  setStart?: React.Dispatch<SetStateAction<boolean | undefined>> 
}

const useWindowResolution = (): { width: number; height: number } => {
  const [resolution, setResolution] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setResolution({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return resolution;
};

function Content(props: Props) {

  const {fraseArray, phraseToComplete, fragments, showDiv, end, intro, indexOfIntro, indexOfFrase, indexOfFrag, toggleMenu, isTrue, intros, endText, showTimer, start, HandleEnd, Skip, IntroBack, HandleNextIntro, Next, TryAgain, HandleElements, IsInOrder, setStart} = props

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const resolution = useWindowResolution();

  return (
    <section className={mobileStyles.sectionContainer}>
        {/* timer */}
      {showTimer && (
        <header>
          <div
            style={{position: "absolute", top: "0"}}
            
          >
            {/* eslint-disable-next-line */}
            <img 
              src="/Arkie.png"
              alt="Arkie"
              className={`${styles.arkieHeader} ${mobileStyles.arkieHeader}`}
              onClick={() => {Router.push("/")}}
            />
          </div>
          <Timer start={start} setStart={setStart} resolution={resolution.width} />
        </header>
      )}
        {/* end of Challenge interface */}
      {end && (
        <article className={`${styles.menuContainer} ${mobileStyles.menuContainer}`}>
          <section className={`${styles.tutorialIntro} ${mobileStyles.tutorialIntro}`}>
            <div className={`${styles.introContainer} ${mobileStyles.introContainer}`}>
              <div>
                {/* eslint-disable-next-line */}
                  <img
                    src="/Arkie.png"
                    alt="Arkie"
                    className={`${styles.arkieIntro} ${mobileStyles.arkieIntro}`}
                  />
              </div>
              <div>
                {endText.map((e, i) => (
                  <h3 key={i}>
                    {e.text}
                  </h3>
                ))}
              </div>
            </div>
            <div>
              <button
                onClick={HandleEnd}
                className={`${styles.button} ${mobileStyles.button}`}
              >
                Menu
              </button>
            </div>
          </section>
        </article>
      )}
      {/* introduction */}
      {intro && (
        <article className={`${styles.menuContainer} ${mobileStyles.menuContainer}`}>
          <section className={`${styles.tutorialIntro} ${mobileStyles.tutorialIntro}`}>
            <div className={`${styles.introContainer} ${mobileStyles.introContainer}`}>
              <div>
                {/* eslint-disable-next-line */}
                <img
                  src="/Arkie.png"
                  alt="Arkie"
                  className={`${styles.arkieIntro} ${mobileStyles.arkieIntro}`}
                />
              </div>
              <div>
                {intros[indexOfIntro].map((e, i) => (
                  <p className={`${styles.text} ${mobileStyles.text}`} key={i}>{e.text}</p>
                ))}
              </div>
            </div>
            <section className={`${styles.buttonsContainer} ${mobileStyles.buttonsContainer}`}>
              <button onClick={Skip} className={`${styles.buttonIntro} ${mobileStyles.buttonIntro}`}>
                Skip
              </button>
              <div>
                <span>
                  <span>
                    {indexOfIntro > 0 && (
                      <button
                        onClick={IntroBack}
                        className={`${styles.buttonIntro} ${mobileStyles.buttonIntro}`}
                        style={
                          indexOfIntro == 3
                            ? { display: "none" }
                            : { display: "" }
                        }
                      >
                        Back
                      </button>
                    )}
                  </span>
                  <span>
                    <button
                      onClick={HandleNextIntro}
                      className={`${styles.buttonIntro} ${mobileStyles.buttonIntro}`}
                    >
                      Next
                    </button>
                  </span>
                </span>
              </div>
            </section>
          </section>
        </article>
      )}
      {/* menu win or fail */}
      {toggleMenu && (
        <article className={`${styles.menuContainer} ${mobileStyles.menuContainer}`}>
          <section className={`${styles.winOrFail} ${mobileStyles.winOrFail}`}>
            <div
              className={`${styles.containerTextWoF} ${mobileStyles.containerTextWoF}`}
              style={
                isTrue
                  ? { backgroundColor: "rgba(0, 255, 0, .5)" }
                  : { backgroundColor: "rgba(255, 0, 0, .5)" }
              }
            >
              <h2 className={`${styles.textWoF} ${mobileStyles.textWoF}`}>
                {isTrue
                  ? "Perfecto! completaste correctamente la frase."
                  : "Intentalo Otra vez. No te rindas!"}
              </h2>
            </div>
            <div className={`${styles.imageContainer} ${mobileStyles.imageContainer}`}>
              {/* eslint-disable-next-line */}
              <img src="/Arkie.png" alt="Arkie" className={`${styles.arkieWoF} ${mobileStyles.arkieWoF}`} />
            </div>
            <div>
              <button
                onClick={isTrue ? Next : TryAgain}
                className={`${styles.menuButton} ${mobileStyles.menuButton}`}
              >
                {isTrue ? "Next" : "Try Again"}
              </button>
            </div>
          </section>
        </article>
      )}
      { /* Game content */}
      <main 
        className={`${styles.gameContainer} ${mobileStyles.gameContainer}`}
        style={
          end || toggleMenu || intro ? 
          {overflow: "hidden"}
          :
          {overflow: "auto"}
        }
        >
        <article className={`${styles.fraseContainer} ${mobileStyles.fraseContainer}`}>
          {fraseArray[indexOfFrase].map((e, i) => (
            <div key={i}>
              <h2>{e.frase}</h2>
            </div>
          ))}
        </article>
        <article className={`${styles.phraseFrags} ${mobileStyles.phraseFrags}`}>
          <div className={`${styles.fragsBox} ${mobileStyles.fragsBox}`}>
            {phraseToComplete?.map((e: Elements, i: number) => (
              <div key={i} className={`${styles.frags} ${mobileStyles.frags}`}>
                <h3>{e.frag}</h3>
              </div>
            ))}
          </div>
        </article>
        <article className={`${styles.fragsContainer} ${mobileStyles.fragsContainer}`}>
          <div className={`${styles.fragsBox} ${mobileStyles.fragsBox}`}>
            {showDiv &&
              fragments[indexOfFrag]
              .sort(() => Math.random() - 0.5)
              .map((frag, i) => (
                <div
                  className={`${styles.frags} ${mobileStyles.frags}`}
                  key={i}
                  onClick={() => HandleElements(frag.fid)}
                >
                  <h3>{frag.frag}</h3>
                </div>
              ))}
          </div>
        </article>
        <div>
          <button
            onClick={() => IsInOrder(phraseToComplete)}
            className={`${styles.button} ${mobileStyles.button}`}
          >
            Comprobar
          </button>
        </div>
      </main>
    </section>
  )
}

export default Content