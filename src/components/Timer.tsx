import Image from "next/image";
import stylesChallenge from "../styles/desktop/Challenges/challenges.module.css";
import { useState, useEffect, SetStateAction, Dispatch } from "react";

type Props = {
  timeLeft?: number;
  timerRef?: React.RefObject<HTMLDivElement>;
  start?: boolean;
  setStart?: Dispatch<SetStateAction<boolean | undefined>>;
  resolution: number;
};

function Timer(props: Props) {
    const { start, setStart, resolution } = props;
    const [seconds, setSeconds] = useState(300);
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            if (start) {
            setSeconds(seconds - 1);
            }
        }, 1000);

        if (seconds === 0) {
            setStart!(false);
            setEndGame(true);
        }

        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {resolution > 640 ?
                  <Image
                    src="/Arkie.png"
                    alt="Arkie"
                    width={240}
                    height={240}
                    className={stylesChallenge.arkie}
                  />
                    :
                  <Image
                    src="/Arkie.png"
                    alt="Arkie"
                    width={90}
                    height={140}
                    className={stylesChallenge.arkie}
                  />
                }
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
