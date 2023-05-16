import { useState, useEffect } from "react";
import styles from "@/styles/desktop/hero.module.css";
import mobileStyles from '../styles/mobile/heroMobile.module.css'
import arkie from "../../public/Arkie.png";
import Image from "next/image";

function Hero() {
  const [showDiv, setShowDiv] = useState<boolean>(false);
  const [showDivTwo, setShowDivTwo] = useState<boolean>(false);
  const [showDivTree, setShowDivTree] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDiv(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDivTwo(true);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowDivTree(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className={`${styles.heroContainer} ${mobileStyles.heroContainer}`}>
      {showDiv && (
        <div className={`${styles.bubbleContainer} ${mobileStyles.bubbleContainer}`}>
          {showDivTwo && (
            <div className={`${styles.bubble} ${mobileStyles.bubble}`} style={{opacity: 1}}>
              {showDivTree && (
                <div>
                  <p>
                    Hola! Mi nombre es Arkie y soy tu compañera en este
                    emocionante camino... Aprender Ingles!
                  </p>
                  <br />
                  <br />
                  <span>
                    <p>Haz click <a href="#Menu">Aqui!</a> para comenzar</p>
                  </span>
                </div>
              )}
            </div>
          )}
          <div className={`${styles.arkieContainer} ${mobileStyles.arkieContainer}`}>
            <Image src={arkie} alt="Arkie" className={`${styles.arkie} ${mobileStyles.arkie}`} />
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;
