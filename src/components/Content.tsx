import styles from "../styles/desktop/content.module.css";
import { Elements } from "./LogicTutorial";
import Timer from "./Timer";
import {SetStateAction, Dispatch} from "react"

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
  start: boolean
  timerRef?: React.RefObject<HTMLDivElement>
  HandleEnd: () => void
  Skip: () => void
  IntroBack: () => void
  HandleNextIntro: () => void
  Next: () => void
  TryAgain: () => void
  HandleElements: (id: number) => void
  IsInOrder: (phrase: Elements[]) => void
  setStart: Dispatch<SetStateAction<boolean>>
}

function Content(props: Props) {

  const {fraseArray, phraseToComplete, fragments, showDiv, end, intro, indexOfIntro, indexOfFrase, indexOfFrag, toggleMenu, isTrue, intros, endText, showTimer, start, HandleEnd, Skip, IntroBack, HandleNextIntro, Next, TryAgain, HandleElements, IsInOrder, setStart} = props

  return (
    <section>
        {/* timer */}
      {showTimer && (
        <Timer start={start} setStart={setStart} />
      )}
        {/* end of Challenge interface */}
      {end && (
        <article className={styles.menuContainer}>
          <section className={styles.tutorialIntro}>
            <div className={styles.introContainer}>
              <div>
                <img
                  src="../../Arkie.png"
                  alt="Arkie"
                  className={styles.arkieIntro}
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
                className={styles.button}
              >
                Menu
              </button>
            </div>
          </section>
        </article>
      )}
      {/* interface introduction */}
      {intro && (
        <article className={styles.menuContainer}>
          <section className={styles.tutorialIntro}>
            <div className={styles.introContainer}>
              <div>
                <img
                  src="../../Arkie.png"
                  alt="Arkie"
                  className={styles.arkieIntro}
                />
              </div>
              <div>
                {intros[indexOfIntro].map((e, i) => (
                  <p className={styles.text} key={i}>{e.text}</p>
                ))}
              </div>
            </div>
            <section className={styles.buttonsContainer}>
              <button onClick={Skip} className={styles.buttonIntro}>
                Skip
              </button>
              <div>
                <span>
                  <span>
                    {indexOfIntro > 0 && (
                      <button
                        onClick={IntroBack}
                        className={styles.buttonIntro}
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
                      className={styles.buttonIntro}
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
        <article className={styles.menuContainer}>
          <section className={styles.winOrFail}>
            <div
              className={styles.containerTextWoF}
              style={
                isTrue
                  ? { backgroundColor: "rgba(0, 255, 0, .5)" }
                  : { backgroundColor: "rgba(255, 0, 0, .5)" }
              }
            >
              <h2 className={styles.textWoF}>
                {isTrue
                  ? "Perfecto! completaste correctamente la frase."
                  : "Intentalo Otra vez. No te rindas!"}
              </h2>
            </div>
            <div className={styles.imageContainer}>
              <img src="../../Arkie.png" alt="Arkie" className={styles.arkie} />
            </div>
            <div>
              <button
                onClick={isTrue ? Next : TryAgain}
                className={styles.menuButton}
              >
                {isTrue ? "Next" : "Try Again"}
              </button>
            </div>
          </section>
        </article>
      )}
      { /* Game content */}
      <section className={styles.gameContainer}>
        <article className={styles.fraseContainer}>
          {fraseArray[indexOfFrase].map((e, i) => (
            <div key={i}>
              <h2>{e.frase}</h2>
            </div>
          ))}
        </article>
        <article className={styles.phraseFrags}>
          <div className={styles.fragsBox}>
            {phraseToComplete?.map((e: Elements, i: number) => (
              <div key={i} className={styles.frags}>
                <h3>{e.frag}</h3>
              </div>
            ))}
          </div>
        </article>
        <article className={styles.fragsContainer}>
          <div className={styles.fragsBox}>
            {showDiv &&
              fragments[indexOfFrag]
              .sort(() => Math.random() - 0.5)
              .map((frag, i) => (
                <div
                  className={styles.frags}
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
            className={styles.button}
          >
            Comprobar
          </button>
        </div>
      </section>
    </section>
  )
}

export default Content