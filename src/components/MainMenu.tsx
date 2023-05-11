import styles from "../styles/desktop/menu.module.css";
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
    <div className={styles.mainMenuContainer}>
      <div>
        <h2 className={styles.titleMenu}>Menu de Arkie</h2>
      </div>
      <div className={styles.menuContainer}>
        <div 
          className={styles.tutorialContainer}
          onMouseEnter={handleMouseEnterA}
          onMouseLeave={handleMouseLeaveA}
        >
          <h2 className={styles.tutorialTitle}>Tutorial</h2>
          <article className={isHoveringTutorial == true ? styles.showTutorialDiv : styles.hideDiv}>
            <div>
              <p className={styles.tutorialText}>
                Aqui aprenderas lo basico para afrontar nuestras futuras
                pruebas. <br />
                Echale un vistazo si se te olvidó algo!
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push("/Tutorial")}
                className={styles.buttonTutorial}
              >
                Ir al tutorial
              </button>
            </div>
          </article>
        </div>
        <div 
          className={styles.challengeContainer}
          onMouseEnter={handleMouseEnterB}
          onMouseLeave={handleMouseLeaveB}
        >
          <h2 className={styles.challengeTitle}>Desafios de Arkie</h2>
          <article className={isHoveringChallenge == true ? styles.showChallengeDiv : styles.hideDiv}>
            <div>
              <p className={styles.challengeText}>
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
                className={styles.buttonChallenges}
              >
                ir al Desafio!
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default MainMenu;
