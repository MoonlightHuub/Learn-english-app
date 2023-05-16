import styles from "../styles/desktop/menu.module.css";
import mobileStyles from '../styles/mobile/mainMenu.module.css'
import { useRouter } from "next/router";
import { useState } from "react";

function MainMenu() {
  const router = useRouter();

  const [isHoveringTutorial, setIsHoveringTutorial] = useState(false);
  const [isHoveringChallenge, setIsHoveringChallenge] = useState(false);

  const handleMouseEnterA = () => {
    setIsHoveringTutorial(true);
  };

  const handleMouseLeaveA = () => {
    setIsHoveringTutorial(false);
  };

  const handleMouseEnterB = () => {
    setIsHoveringChallenge(true)
  }

  const handleMouseLeaveB = () => {
    setIsHoveringChallenge(false)
  }

  return (
    <article className={`${styles.mainMenuContainer} ${mobileStyles.mainMenuContainer}`}>
      <header>
        <h2 className={`${styles.titleMenu} ${mobileStyles.titleMenu}`}>Menu de Arkie</h2>
      </header>
      <main className={`${styles.menuContainer} ${mobileStyles.menuContainer}`}>
        <section 
          className={`${styles.tutorialContainer} ${mobileStyles.tutorialContainer}`}
          onMouseEnter={handleMouseEnterA}
          onMouseLeave={handleMouseLeaveA}
        >
          <h2 className={`${styles.tutorialTitle} ${mobileStyles.tutorialTitle}`}>Tutorial</h2>
          <article className={`${isHoveringTutorial == true ? styles.showTutorialDiv : styles.hideDiv} ${isHoveringTutorial == true ? mobileStyles.showTutorialDiv : mobileStyles.hideDiv }`}>
            <div>
              <p className={`${styles.tutorialText} ${mobileStyles.tutorialText}`}>
                Aqui aprenderas lo basico para afrontar nuestras futuras
                pruebas. <br />
                Echale un vistazo si se te olvidó algo!
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push("/Tutorial")}
                className={`${styles.buttonTutorial} ${mobileStyles.buttonTutorial}`}
              >
                Ir al tutorial
              </button>
            </div>
          </article>
        </section>
        <section 
          className={`${styles.challengeContainer} ${mobileStyles.challengeContainer}`}
          onMouseEnter={handleMouseEnterB}
          onMouseLeave={handleMouseLeaveB}
        >
          <h2 className={`${styles.challengeTitle} ${mobileStyles.challengeTitle}`}>Desafios de Arkie</h2>
          <article className={`${isHoveringChallenge ? styles.showChallengeDiv : styles.hideDiv} ${isHoveringChallenge ? mobileStyles.showChallengeDiv : mobileStyles.hideDiv }`}>
            <div>
              <p className={`${styles.challengeText} ${mobileStyles.challengeText}`}>
                Aqui podras acceder a nuestros desafios que pondran a prueba tus
                habilidades y conocimiento. <br />
                Tendremos limite de tiempo y si fallamos volveremos al
                principio! No es por ponerte presión, pero es para
                profesionales.
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push("/Challenges")}
                className={`${styles.buttonChallenges} ${mobileStyles.buttonChallenges}`}
              >
                ir al Desafio!
              </button>
            </div>
          </article>
        </section>
      </main>
    </article>
  );
}

export default MainMenu;
