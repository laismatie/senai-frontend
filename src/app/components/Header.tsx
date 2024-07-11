import Image from "next/image";
import styles from './Header.module.css';

export function Header() {
  return (
    <>
      <div className={styles.container}>
        <Image
          src="/images/logo.png"
          alt="SENAI Logo"
          width={148}
          height={98} />

        <button className={styles.button}>Clique para visualizar a versão Web.</button>

        <Image
          src="/images/icon_acessibility.svg"
          alt="Icon Acessibility"
          width={44}
          height={44} />

      </div>

      <div className={styles.actions}>
        <button className={styles.buttonAction}>Sobre o projeto</button>
        <button className={styles.buttonAction}>Inscrições</button>
        <button className={styles.buttonAction}>Painel Admin</button>
      </div>
    </>
  );
}
