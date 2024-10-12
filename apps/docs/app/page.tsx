'use client';
import Image from 'next/image';
import styles from './page.module.css';
import React, { useEffect, useRef } from 'react';
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

import Flicking from '@egjs/react-flicking';
import '@egjs/react-flicking/dist/flicking.css';
import { AutoPlay } from '@egjs/flicking-plugins';

import { initializeApp } from 'firebase/app';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import ReactGA from 'react-ga4';


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FB_PORJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDERT_ID,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMEND_ID,
};

const gaTrackingId = process.env.NEXT_PUBLIC_FB_MEASUREMEND_ID;

if (gaTrackingId) {
    ReactGA.initialize(gaTrackingId);
}
// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
    const targetRef = useRef<HTMLDivElement | null>(null);
    const [email, setEmail] = React.useState<string>('');
    const plugins = [
        new AutoPlay({
            animationDuration: 2000,
            direction: 'NEXT',
            stopOnHover: false,
        }),
    ];

    useEffect(() => {
        const trackingId = process.env.NEXT_PUBLIC_FB_MEASUREMEND_ID;

        if (trackingId) {
            // GA 초기화
            ReactGA.initialize(trackingId);

            // 초기 페이지뷰 전송
            ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
        } else {
            console.warn("Google Analytics tracking ID is missing.");
        }
    }, []);


    const Carousel = () => {
        return (
            <div className={styles.carouselContainer}>
                <Flicking
                    gap={30}
                    circular={true}
                    defaultIndex={1}
                    autoPlay={1}
                    duration={0}
                    plugins={plugins}
                >
                    <div className={styles.carouselItem}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={mockupImage1}
                                alt="mockupImage1"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={mockupImage2}
                                alt="mockupImage2"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={mockupImage3}
                                alt="mockupImage3"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    <div className={styles.carouselItem}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={mockupImage4}
                                alt="mockupImage4"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                </Flicking>
            </div>
        );
    };
    // if (!userDoc.exists()) {
    //     await setDoc(userDocRef, {
    //         email: user.email,
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //         createdAt: new Date()
    //     });
    //     console.log('새 사용자 문서 생성됨');
    // } else {
    //     console.log('기존 사용자 문서 존재');
    // }
    const reserveEmail = async () => {
        try {
            const userDocRef = doc(db, 'reserve', email);
            await setDoc(userDocRef, {
                email: email,
                timestamp: new Date(),
            });

            alert('이메일이 성공적으로 저장되었습니다: ' + email);
            setEmail('');
        } catch (error) {
            console.error('Error adding email:', error);
            alert('이메일 저장 실패');
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
                <h1>
                    원하는 스타일의 <br /> 촬영메이트를 쉽게 찾아보세요
                </h1>
                <button className={styles.primaryBtn} onClick={handleScroll}>
                    오픈 알림 받기
                </button>
                <section className={styles.cards}>{Carousel()}</section>
            </section>

            <section className={styles.concerns}>
                <h2>
                    콘텐츠 촬영을 하다가 <br />
                    이런 고민을 하신 적이 있나요?
                </h2>
                <div className={styles.concernCards}>
                    <div className={styles.concernInline}>
                        <div className={styles.concernCard}>
                            <Image
                                src={concernStyle}
                                alt="concernStyle"
                                className={styles.commonImage}
                            />
                        </div>
                        <div className={styles.concernCard}>
                            <Image
                                src={concernCost}
                                alt="concernCost"
                                className={styles.commonImage}
                            />
                        </div>
                    </div>
                    <div className={styles.concernInline}>
                        <div className={styles.concernCard}>
                            <Image
                                src={concernSell}
                                alt="concernSell"
                                className={styles.commonImage}
                            />
                        </div>
                        <div className={styles.concernCard}>
                            <Image
                                src={concernGrowth}
                                alt="concernGrowth"
                                className={styles.commonImage}
                            />
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
                        <input
                            className={styles.input}
                            type="email"
                            placeholder="이메일을 입력해주세요"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className={styles.subscribeBtn}
                            onClick={reserveEmail}
                        >
                            알림 받기
                        </button>
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
