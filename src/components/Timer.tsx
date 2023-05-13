import stylesChallenge from "../styles/desktop/Challenges/challenges.module.css";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

type Props = {
  timeLeft?: number;
  timerRef?: React.RefObject<HTMLDivElement>;
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
};

function Timer(props: Props) {
    const { start, setStart } = props;
    const [seconds, setSeconds] = useState(300);
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (start) {
            setSeconds(seconds - 1);
            }
        }, 1000);

        if (seconds === 0) {
            setStart(false);
            setEndGame(true);
        }

        return () => clearInterval(timer);
    }, [start, seconds]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const reloadPage = () => {
        window.location.reload();
    };

  return (
    <div className={stylesChallenge.timerContainer}>
      {endGame && (
        <div className={stylesChallenge.endOfGame}>
          <div className={stylesChallenge.menuEndOfGame}>
            <section className={stylesChallenge.contentMenu}>
              <div className={stylesChallenge.arkieContainer}>
                <img
                  src="../../Arkie.png"
                  alt="Arkie"
                  className={stylesChallenge.arkie}
                />
              </div>
              <div className={stylesChallenge.textContainer}>
                <p className={stylesChallenge.text}>
                  ¡Se ha acabado el tiempo! Reinicia el desafio para seguir compitiendo. Calma, Roma no se construyo en un día.
                </p>
              </div>
            </section>
            <div>
              <button className={stylesChallenge.button} onClick={reloadPage}>Try Again</button>
            </div>
          </div>
        </div>
      )}
      <div className={stylesChallenge.counterContainer}>
        <h3 className={stylesChallenge.counter}>
          {minutes.toString().padStart(1, "0")}:{remainingSeconds.toString().padStart(2, "0")}
        </h3>
      </div>
    </div>
  );
}

export default Timer;
