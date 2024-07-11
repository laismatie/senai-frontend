'use client';

import Image from "next/image";
import styles from './Header.module.css';
import React, { useState } from "react";
import SubscriptionModal from "./SubscriptionModal";
import { SubscriptionForm } from "./SubscriptionForm";
import { LoginForm } from "./LoginForm";

export function Header() {
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState(false);
  const handleOpenSubscriptionModal = () => setOpenSubscriptionModal(true);
  const handleCloseSubscriptionModal = () => setOpenSubscriptionModal(false);
  
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

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
        <button onClick={handleOpenSubscriptionModal} className={styles.buttonAction}>Inscrições</button>
        <button onClick={handleOpenLoginModal} className={styles.buttonAction}>Painel Admin</button>
      </div>

      <SubscriptionModal open={openSubscriptionModal} handleClose={handleCloseSubscriptionModal}>
        <SubscriptionForm/>
      </SubscriptionModal>

      <SubscriptionModal open={openLoginModal} handleClose={handleCloseLoginModal}>
        <LoginForm/>
      </SubscriptionModal>
    </>
  );
}
