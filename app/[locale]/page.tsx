"use client";

import "./page.css";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Sponsors } from "./components/sponsors/Sponsors";
import { services, services_labels } from "./consts/services";
import SplitText from "gsap/src/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  const t = useTranslations("Home");
  const t_general = useTranslations();
  const t_serviceConst = useTranslations("const_services");
  const sponsors = useRef<HTMLElement>(null);
  const squares = useRef<HTMLDivElement>(null);
  const arrowBottom = useRef<HTMLSpanElement>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const textsContainer = useRef<HTMLDivElement | null>(null);
  const textsSlider = useRef<HTMLDivElement | null>(null);
  const objectives = useRef<HTMLElement | null>(null);
  const objectives_title = useRef<HTMLSpanElement | null>(null);
  const [serviceShow, setServiceShow] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const listRef = useRef<HTMLUListElement | null>(null);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const TEXTS = [
    t.raw("texts.0"),
    t.raw("texts.1"),
    t.raw("texts.2"),
    t.raw("texts.3"),
    t.raw("texts.4"),
  ];

  const OBJECTIVES = [
    t.raw("objectives.0"),
    t.raw("objectives.1"),
    t.raw("objectives.2"),
    t.raw("objectives.3"),
    t.raw("objectives.4"),
    t.raw("objectives.5"),
  ];

  const confidencesRaw = (t_general.raw("confidences") || []) as Array<{
    icon: string;
    title: string;
    text: string;
  }>;

  const CONFIDENCES = confidencesRaw.map((item) => ({
    icon: item.icon,
    title: item.title,
    text: item.text,
  }));

  const moveHighlight = (el: HTMLElement) => {
    if (!listRef.current || !highlightRef.current) return;

    const parentRect = listRef.current.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    const offsetTop = rect.top - parentRect.top;

    highlightRef.current.style.transform = `translateY(${offsetTop}px)`;
    highlightRef.current.style.height = `${rect.height}px`;
    highlightRef.current.style.opacity = "1";
  };

  const items = [...services_labels, ...services_labels, ...services_labels];
  const { locale } = useParams() as { locale: string };

  useEffect(() => {
    const el = sponsors.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-blurred-fade-in");
        }
      },
      {
        threshold: 0.6
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setServiceShow(currentScroll > 200);
      if (currentScroll <= 200 || currentScroll > 3000) {
        setShowServices(false);
      } else {
        setShowServices(showServices => showServices);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let position = 0;
    let currentSpeed = 0;
    const maxSpeed = 0.3;
    const acceleration = 0.002;

    let direction = -1;
    let rafId: number;

    const loop = () => {
      if (currentSpeed < maxSpeed) currentSpeed += acceleration;

      position += currentSpeed * direction;

      const maxOffset = el.scrollWidth / 2;

      if (position <= -maxOffset) {
        direction = 1;
      }

      if (position >= 0) {
        direction = -1;
      }

      el.style.transform = `translateX(${position}px)`;
      rafId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 400) {
        arrowBottom.current?.classList.replace("opacity-100", "opacity-0");
      } else if (currentScroll <= lastScroll && currentScroll <= 400) {
        arrowBottom.current?.classList.replace("opacity-0", "opacity-100");
      }
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!squares.current) return;

    squares.current.classList.remove("opacity-0");

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const xOffset = Math.min(vw * 0.2, 200);
    const yOffset1 = -Math.min(vh * (vw > 768 ? 0.6 : 0.35), 400);
    const yOffset2 = Math.min(vh * 0.7, 500);
    const scale = vw < 640 ? 1.1 : 1.5;
    const rotate = vw < 640 ? 20 : 45;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: squares.current,
        start: "top 100%",
        end: "bottom 30%",
        scrub: true
      }
    });

    tl
      .to(squares.current.children[0], { x: -xOffset, rotate, scale })
      .to(squares.current.children[1], { x: xOffset, rotate: -rotate, scale }, "<")
      .to(squares.current.children[0], { y: yOffset1 }, ">")
      .to(squares.current.children[1], { y: yOffset2 }, "<")


    let index = 0;
    let intervalId: number | null = null;

    const textsObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const container = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            container.classList.remove("opacity-0");
            if (textsSlider.current) {
              const texts = Array.from(textsSlider.current.children) as HTMLElement[];
              texts.forEach(el => el.classList.add("show-texts"));
            }

            if (!intervalId && textsSlider.current) {
              const firstItem = textsSlider.current.children[0] as HTMLElement;
              const itemHeight = firstItem.offsetHeight + 16;

              intervalId = window.setInterval(() => {
                if (!textsSlider.current) return;

                const children = Array.from(textsSlider.current.children) as HTMLElement[];

                let offset = 0;
                for (let i = 0; i < index; i++) {
                  offset += children[i].offsetHeight;
                }

                textsSlider.current.style.transform = `translateY(-${offset}px)`;

                index++;

                if (index > children.length - 1) {
                  index = 0;
                }
              }, 3000);




            }
          } else {
            container.classList.add("opacity-0");

            if (intervalId) {
              clearInterval(intervalId);
              intervalId = null;
            }

            index = 0;

            if (textsSlider.current) {
              textsSlider.current.style.transform = "translateY(0)";
            }
          }
        });
      },
      { threshold: 1 }
    );

    if (textsContainer.current) {
      textsObserver.observe(textsContainer.current);
    }




    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!textsSlider.current || !textsContainer.current) return;

    const texts = gsap.utils.toArray<HTMLElement>(
      textsSlider.current.children
    );

    gsap.set(texts, {
      opacity: 0,
      scale: 0.8,
    });

    gsap.to(texts, {
      opacity: 1,
      scale: 1,
      stagger: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textsContainer.current,
        start: "top 65%",
        end: "top 35%",
        toggleActions: "play reverse play reverse",
      },
    });

  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const el = objectives_title.current;
          if (!el) return;

          const parent = el.parentElement;
          if (!parent) return;

          if (entry.isIntersecting) {
            const parentRect = parent.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();

            let maxX = parentRect.right - elRect.right;
            maxX = Math.max(0, Math.min(maxX, window.innerWidth - elRect.right));

            gsap.to(el, {
              opacity: 1,
              x: maxX,
              duration: 0.6,
              ease: "power2.out",
            });
          } else {
            gsap.to(el, {
              opacity: 0,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (objectives.current) observer.observe(objectives.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;

          el.classList.remove("opacity-0");

          const textEl = el.querySelector(".objective-text") as HTMLElement;

          if (textEl) {
            const fullText = textEl.dataset.text || "";

            // 1. Meter el texto antes de split
            textEl.textContent = fullText;

            // 2. Split
            const split = new SplitText(textEl, { type: "words,chars" });

            // 3. Estado inicial
            gsap.set(split.chars, {
              opacity: 0,
              y: 10
            });

            // 4. Animación
            gsap.to(split.chars, {
              opacity: 1,
              y: 0,
              stagger: 0.01,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    const objetivos = document.querySelectorAll(".objective");
    objetivos.forEach(obj => observer.observe(obj));

    return () => observer.disconnect();
  }, []);


  return (
    <div className="relative w-full flex flex-col px-2">
      <section aria-label="introduction" className="relative w-full flex flex-col justify-center items-center min-h-screen">
        {/* Background Grid & Futuristic Glow Aura */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[36px_36px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-87.5 bg-linear-to-tr from-cyan-500/20 via-indigo-500/20 to-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />
        <div className="w-full md:max-w-200 overflow-hidden">
          <header className="flex flex-col pt-5 pb-8 justify-center items-center">
            <Link href="https://maps.app.goo.gl/Q2wQR9MwrGfwMzWb6" target="_blank" className="dark:hover:text-green-500 hover:text-green-800 overflow-hidden relative flex flex-row justify-center items-center gap-1 w-full text-sm dark:text-white/60 text-black/60 group">
              <i className="icon-[mi--location]" />
              <span>Palau-solità i Plegamans</span>
              <i className="icon-[mynaui--external-link] text-[12px] px-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              <div className="absolute top-0 left-0 w-full h-full dark:bg-black/30 bg-white/30 backdrop-blur-xs" id="show-location" />
            </Link>
          </header>

          <h1 className="dark:text-white text-black text-4xl md:text-6xl font-extrabold text-center animate-fade-in-up">
            {t.raw("title")}
          </h1>

          <div className="services-carrousel py-5 flex flex-col w-full overflow-hidden">
            <div ref={carouselRef} className="flex flex-row flex-nowrap gap-3 justify-start items-start w-max">
              {items.map((service, index) => (
                <div key={index} className="service-label flex flex-col gap-2 items-start md:max-w-50 min-h-22 justify-start p-3 dark:bg-[#1f1f1f]/40 bg-[#f1f1f1]/40 backdrop-blur-2xl w-fit rounded-lg min-w-40">
                  <i className={service.icon} />
                  <span className={`${service.textStyles}`}>
                    {t_serviceConst.raw(service.label)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SERVICES BUTTONS */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4 py-8 z-10">
          <Link
            href={`/${locale}/services`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium dark:text-white dark:hover:text-white hover:text-white text-black bg-white/5 backdrop-blur-md border dark:border-white/10 border-black/25 dark:hover:bg-white/10 hover:bg-black dark:hover:border-white/20 hover:border-black/10 transition-all duration-300
            "
          >
            {t.raw("buttons.viewServices")}
          </Link>
        </div>


        <div className="w-full flex justify-center items-center py-10 mt-10">
          <span ref={arrowBottom} className="opacity-100 p-2 flex justify-center items-center pointer-events-none animate-up-down transition-all cursor-pointer">
            <i className="icon-[line-md--arrow-down] text-[27px] dark:text-white text-black" />
          </span>
        </div>
      </section>

      <section className="relative w-full overflow-hidden min-h-screen flex flex-col justify-center items-center" id="section-bottom-mask-texts">
        <div ref={squares} className="z-9999 flex flex-row gap-6 justify-center items-center opacity-0">
          <div className="rounded-square size-20 sm:size-28 rounded-3xl bg-linear-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 dark:border-cyan-400/20 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] -rotate-12" />
          <div className="rounded-square size-20 sm:size-28 rounded-3xl bg-linear-to-br from-indigo-500/10 to-transparent border border-indigo-500/30 dark:border-indigo-400/20 backdrop-blur-xl shadow-[0_0_30px_rgba(99,102,241,0.1)] rotate-12" />
        </div>
        <div
          ref={textsContainer}
          className="absolute top-1/2 -translate-y-1/2 left-0 h-[3.5em] sm:h-[2.5em] w-full flex items-center     justify-center overflow-hidden opacity-0 transition-opacity duration-500
          "
          id="texts-scroll-area"
        >


          <div className="flex flex-col justify-start items-center transition-transform duration-500 h-full" ref={textsSlider}>
            {TEXTS.map((text, index) => {
              return (
                <span key={index} className="text-xl sm:text-3xl dark:text-white/80 text-black/80 text-center px-4 leading-snug wrap-break-words">
                  {text}
                </span>
              )
            })}
          </div>
        </div>
      </section>

      <section
        className="relative w-full min-h-screen flex flex-col justify-start items-center"
        ref={objectives}
      >
        <span
          ref={objectives_title}
          className="
            sticky top-22 md:top-15
            dark:text-cyan-400 text-cyan-600 text-xs tracking-widest uppercase font-mono
            px-4 py-1.5 border border-cyan-500/30
            dark:bg-[#080809]/90 bg-white/90 backdrop-blur-xl rounded-full
            shadow-[0_0_15px_rgba(6,182,212,0.15)]
            z-500
            will-change-transform
          "
        >
          {t.raw("float_labels.objectives")}
        </span>

        <div className="w-full flex justify-center items-center py-6">
          <div className="relative">
            <div className="absolute inset-0 rounded-full dark:bg-green-600/20 bg-green-600/10 blur-2xl" />
            <i className="icon-[streamline--target] text-4xl dark:text-green-600 text-green-300 relative z-10" />
          </div>
        </div>

        <div className="flex flex-1 justify-center items-center w-full md:max-w-4xl px-4 pt-10 pb-25">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-7">
            {OBJECTIVES.map((obj, index) => {
              return (
                <div key={index} className="bg-liquid-glass rounded-xl dark:bg-white/5 bg-black/5 backdrop-blur-md px-6 pt-6 pb-10 text-left objective opacity-0 transition-all duration-500">
                  <span className="text-4xl dark:text-white/50 text-black/50 font-bold">
                    “
                  </span>
                  <div className="objective-text text-base dark:text-white text-black leading-relaxed" data-text={obj}>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      <section className="w-full min-h-screen flex flex-col justify-center items-center px-4 py-20">
        <div
          className="w-full max-w-5xl flex flex-col items-center gap-14"
          ref={el => {
            if (!el) return;
            gsap.fromTo(
              el.children,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 70%",
                },
              }
            );
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="dark:text-white text-black text-3xl md:text-4xl font-bold">
              {t.raw("why_trust_us")}
            </h2>
            <p className="dark:text-white/60 text-black/60 max-w-2xl text-sm md:text-base">
              {t.raw("we_are_working_with_focus")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {CONFIDENCES.map((item, i) => (
              <div
                key={i}
                className="dark:bg-white/5 bg-black/5 backdrop-blur-md border dark:border-white/10 border-black/10 rounded-2xl p-6 flex flex-col gap-4"
                ref={card => {
                  if (!card) return;
                  gsap.fromTo(
                    card,
                    { opacity: 0, y: 30 },
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: "power2.out",
                      scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                      },
                    }
                  );
                }}
              >
                <i className={`${item.icon} text-2xl dark:text-green-500 text-green-600`} />
                <h3 className="dark:text-white text-black font-semibold text-lg">{item.title}</h3>
                <p className="dark:text-white/60 text-black/60 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="flex flex-col items-center gap-6 pt-10"
        ref={cta => {
          if (!cta) return;
          gsap.fromTo(
            cta,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cta,
                start: "top 85%",
              },
            }
          );
        }}
      >
        <p className="dark:text-white/60 text-green-600 dark:text-sm text-lg text-center max-w-xl">
          {t.raw("slogan")}
        </p>
      </section>
      {!showServices ? (
        <button
          onClick={() => { setShowServices(true) }}
          type="button"
          className={`sticky ${serviceShow ? 'bottom-5' : '-bottom-full'} mt-5 inline-flex justify-center items-center gap-2 w-full max-w-55 mx-auto px-5 py-3 rounded-xl text-sm font-semibold dark:text-white text-black dark:bg-white/10 bg-black/10 backdrop-blur-2xl z-9995 dark:hover:bg-white/90 hover:bg-black/90 dark:hover:text-black hover:text-white transition-all duration-300 group hover:scale-101 cursor-pointer animate-fade-in-up animate-duration-200 group`}
        >
          {t.raw("buttons.requestService")}
          {/* <i className="icon-[line-md--chevron-right]" /> */}
          <i className="icon-[solar--magnifer-bold] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      ) : (
        <div className={`sticky ${serviceShow ? 'bottom-5' : '-bottom-full'} mt-5 flex flex-col justify-start items-start w-full max-w-fit mx-auto px-5 py-3 rounded-xl text-sm font-semibold dark:text-white text-black dark:bg-[#1f1f1f] bg-[#f1f1f1] shadow-xl shadow-white/5 z-9995 transition-all duration-300 group animate-fade-in animate-duration-100`}>
          <button
            type="button"
            onClick={() => { setShowServices(false) }}
            className="flex flex-row justify-center items-center gap-2 cursor-pointer dark:text-white/70 text-black/70 dark:hover:text-white hover:text-black transition-all duration-300 mb-3"
          >
            <i className="icon-[line-md--arrow-left]" />
            {t.raw("buttons.requestService")}
          </button>
          <div className="w-full h-px dark:bg-white/5 bg-black/5 mb-2"></div>
          <ul
            ref={listRef}
            className="relative animate-fade-in-left animate-duration-200 flex flex-col justify-start items-start"
          >
            <div
              ref={highlightRef}
              className="absolute left-0 top-0 w-full dark:bg-white/5 bg-black/5 rounded-lg pointer-events-none opacity-0 transition-[transform,height,opacity] duration-300 ease-out flex flex-col justify-start items-start"
            />

            {Object.keys(services).map(key => {
              const service = services[key as keyof typeof services];

              return (
                <li key={key} className="flex flex-row w-full justify-start items-start">
                  <Link
                    onMouseEnter={(e) => moveHighlight(e.currentTarget)}
                    onMouseLeave={() => {
                      if (highlightRef.current) {
                        highlightRef.current.style.opacity = "0";
                      }
                    }}
                    className="flex flex-row justify-start items-center gap-5 w-full py-2 px-3 rounded-lg"
                    href={`/${locale}/services/request/${service.slug}`}
                  >
                    <i className={`${service.icon} text-lg dark:text-green-500 text-green-600`} />
                    <span className="dark:text-white/80 text-black/70 text-sm">{t_serviceConst(service.label)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )
      }

      {/* <div className="w-full h-px py-5"></div> */}
      { /* SPONSORS */}
      <section ref={sponsors} className="mt-20 opacity-0">
        <Sponsors />
      </section>
    </div>
  );
}
