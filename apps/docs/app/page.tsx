'use client';
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useRef } from "react";
import mockupImage1 from '../images/mockup1.png';
import mockupImage2 from '../images/mockup2.png';
import mockupImage3 from '../images/mockup3.png';
import mockupImage4 from '../images/mockup4.png';
import concernStyle from '../images/style_concern.png';
import concernCost from '../images/cost_concern.png';
import concernSell from '../images/sell_concern.png';
import concernGrowth from '../images/growth_concern.png';
import mate from '../images/mate.png';
import Logo from '../images/logo.png';
import LogoBlack from '../images/logo_black.png';
import axios from 'axios';

import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";




export default function Home() {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const Carousel = () => {
    return (
      <div className={styles.carouselContainer}>
        <Flicking gap={30} circular={true} defaultIndex={1}>
          <div className={styles.carouselItem}>
            <Image src={mockupImage1} alt="mockupImage1" />
          </div>
          <div className={styles.carouselItem}>
            <Image src={mockupImage2} alt="mockupImage2" />
          </div>
          <div className={styles.carouselItem}>
            <Image src={mockupImage3} alt="mockupImage3" />
          </div>
          <div className={styles.carouselItem}>
            <Image src={mockupImage4} alt="mockupImage4" />
          </div>
        </Flicking>
      </div>
    );
  };

  const reserveEmail = async () => {
    try {
      const res = await axios.post('http://localhost:8080/user/emailReserve', {
        email: 'email@gmail.com',
      });

      alert('서비스 호출 성공: ' + res.data.message); // 성공 시 얼럿 표시

    } catch (error) {
      console.error('Error calling service:', error);
      alert('서비스 호출 실패'); // 실패 시 얼럿 표시
    }
  };

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" />
        </div>
        {/* <nav className={styles.nav}>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav> */}
        {/* <div className={styles.authButtons}>
          <button className={styles.signinBtn}>Sign In</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div> */}
      </header>

      <section className={styles.section1}>
        <h2>비즈니스 성장을 위한</h2>
        <h1>원하는 스타일의 <br /> 촬영메이트를 쉽게 찾아보세요</h1>
        <button className={styles.primaryBtn} onClick={handleScroll}>오픈 알림 받기</button>
        <section className={styles.cards}>
          {Carousel()}
      </section>
      </section>

      <section className={styles.concerns}>
        <h2>콘텐츠 촬영을 하다가 <br />이런 고민을 하신 적이 있나요?</h2>
        <div className={styles.concernCards}>
          <div className={styles.concernInline}>
            <div className={styles.concernCard}>
              <Image src={concernStyle} alt="concernStyle" />
            </div>
            <div className={styles.concernCard}>
              <Image src={concernCost} alt="concernCost" />
            </div>
          </div>
          <div className={styles.concernInline}>
            <div className={styles.concernCard}>
              <Image src={concernSell} alt="concernSell" />
            </div>
            <div className={styles.concernCard}>
              <Image src={concernGrowth} alt="concernGrowth" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.textBox}>
          <h2>셀라보에서</h2>
          <span>알아서 잘 딱 깔끔하고 센스있는</span>
        </div>
        <h2>촬영메이트를 찾을 수 있어요</h2>
        <p>더이상 번거롭게 여러곳에 문의하지 않아도 괜찮아요.</p>
        <div className={styles.ctaCards}>
          <div className={styles.ctaCard}>
            <Image src={mate} alt="mate" />
          </div>
        </div>
      </section>

      <section className={styles.subscribe}>
        <div className={styles.textBox}>
          <span style={{ marginLeft: '0px' }}>매출</span>
          <h2>을 위해서는</h2>
        </div>
        <div className={styles.textBox}>
          <span>더 좋은 콘텐츠</span>
          <h2>가 필요합니다</h2>
        </div>
        <div className={styles.emailBox}>
          <p>서비스가 오픈되면 가장 먼저 알려드릴게요!</p>
          <div className={styles.emailBoxInput} ref={targetRef}>
            <input className={styles.input} type="email" placeholder="이메일을 입력해주세요" />
            <button className={styles.subscribeBtn} onClick={reserveEmail}>알림 받기</button>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <Image src={LogoBlack} alt="LogoBlack" />
        <p>Cellabor. All rights reserved</p>
        <p>문의 | jellosu0@gmail.com</p>
      </footer>
    </div>
  );
}
