import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from './FloatingHearts';

const messages = [
  'Are you sure? 🥺',
  'Nice try 😏',
  'You really thought I’d let you? 😂',
  'The NO button has chosen freedom 🏃‍♂️💨',
  'Come on... we both know the answer ❤️',
  'That button is getting shy now 👀',
  'Stop chasing the poor button 😭',
  'I admire the persistence... but NO. 😌',
  'Maybe stop chasing me? 👀',
  'Just click YES already, silly 💕',
];

const gifs = [
  {
    url: 'https://media.tenor.com/F2SQcVd5fMIAAAAi/hug-couple.gif',
    message:
      'Come here... you deserve the biggest hug 🫂❤️',
  },
  {
    url: 'https://media1.tenor.com/m/FVGHQWQBlsYAAAAC/friends-tv-friends.gif',
    message:
      'Yeah, call me now 📞😏',
  },
  {
    url: 'https://media.tenor.com/q5fSiGwpuCAAAAAM/milk-and-mocha-hug.gif',
    message:
      'Why are you so cutie junior 🥹❤️',
  },
];

const BUTTON_WIDTH = 140;
const BUTTON_HEIGHT = 58;

export default function Proposal() {
  const noButtonRef =
    useRef<HTMLButtonElement>(null);

  const messageHistoryRef =
    useRef<number[]>([]);

  const [noPosition, setNoPosition] =
    useState<{
      left: number;
      top: number;
    } | null>(null);

  const [attempts, setAttempts] =
    useState(0);

  const [accepted, setAccepted] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [currentGif, setCurrentGif] =
    useState(0);

  /*
   * ========================================
   * RANDOM SARCASTIC MESSAGE
   * ========================================
   *
   * Each message is shown once before
   * the list starts over again.
   */
  const getRandomMessage = () => {
    if (
      messageHistoryRef.current.length >=
      messages.length
    ) {
      messageHistoryRef.current = [];
    }

    const available = messages
      .map((_, index) => index)
      .filter(
        (index) =>
          !messageHistoryRef.current.includes(
            index
          )
      );

    const randomIndex =
      available[
        Math.floor(
          Math.random() *
            available.length
        )
      ];

    messageHistoryRef.current.push(
      randomIndex
    );

    return messages[randomIndex];
  };

  /*
   * ========================================
   * MOVE NO BUTTON
   * ========================================
   *
   * Moves 150–300px away from cursor.
   */
  const escapeNoButton = (
    cursorX: number,
    cursorY: number
  ) => {
    const padding = 20;

    const distance =
      150 + Math.random() * 150;

    const angle =
      Math.random() * Math.PI * 2;

    let newCenterX =
      cursorX +
      Math.cos(angle) * distance;

    let newCenterY =
      cursorY +
      Math.sin(angle) * distance;

    /*
     * Keep button inside viewport.
     */
    const minX =
      BUTTON_WIDTH / 2 + padding;

    const maxX =
      window.innerWidth -
      BUTTON_WIDTH / 2 -
      padding;

    const minY =
      BUTTON_HEIGHT / 2 + padding;

    const maxY =
      window.innerHeight -
      BUTTON_HEIGHT / 2 -
      padding;

    newCenterX = Math.max(
      minX,
      Math.min(
        maxX,
        newCenterX
      )
    );

    newCenterY = Math.max(
      minY,
      Math.min(
        maxY,
        newCenterY
      )
    );

    setNoPosition({
      left:
        newCenterX -
        BUTTON_WIDTH / 2,

      top:
        newCenterY -
        BUTTON_HEIGHT / 2,
    });

    setAttempts(
      (previous) => previous + 1
    );

    setMessage(
      getRandomMessage()
    );
  };

  /*
   * ========================================
   * DETECT CURSOR NEAR NO BUTTON
   * ========================================
   */
  useEffect(() => {
    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const button =
        noButtonRef.current;

      if (!button || accepted) {
        return;
      }

      const rect =
        button.getBoundingClientRect();

      const centerX =
        rect.left +
        rect.width / 2;

      const centerY =
        rect.top +
        rect.height / 2;

      const distance =
        Math.sqrt(
          Math.pow(
            event.clientX -
              centerX,
            2
          ) +
            Math.pow(
              event.clientY -
                centerY,
              2
            )
        );

      /*
       * Escape before cursor actually
       * touches the button.
       */
      if (distance < 55) {
        escapeNoButton(
          event.clientX,
          event.clientY
        );
      }
    };

    window.addEventListener(
      'mousemove',
      handleMouseMove
    );

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, [accepted]);

  /*
   * ========================================
   * MOBILE TOUCH SUPPORT
   * ========================================
   */
  const handleTouch = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const touch =
      event.touches[0];

    escapeNoButton(
      touch.clientX,
      touch.clientY
    );
  };

  /*
   * YES grows after every NO attempt.
   */
  const yesScale =
    1 +
    Math.min(
      attempts * 0.12,
      1.2
    );

  /*
   * ========================================
   * GIF SEQUENCE
   * ========================================
   */
  useEffect(() => {
    if (!accepted) {
      return;
    }

    setCurrentGif(0);

    const timers = [
      setTimeout(() => {
        setCurrentGif(1);
      }, 3500),

      setTimeout(() => {
        setCurrentGif(2);
      }, 7000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [accepted]);

  /*
   * ========================================
   * AFTER YES
   * ========================================
   */
  if (accepted) {
    return (
      <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 px-5">

        {/* Background hearts */}

        <FloatingHearts
          count={35}
          dark={false}
        />

        <div className="relative z-10 flex h-full w-full max-w-xl items-center justify-center">

          <div className="flex w-full flex-col items-center text-center">

            {/* ================================= */}
            {/* GIF AREA */}
            {/* ================================= */}

            <div className="relative flex h-[330px] w-full items-center justify-center">

              <AnimatePresence mode="wait">

                <motion.div
                  key={currentGif}
                  initial={{
                    opacity: 0,
                    scale: 0.65,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.75,
                    y: -20,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: 'easeOut',
                  }}
                  className="absolute flex flex-col items-center"
                >

                  {/* Direct GIF */}

                  <img
                    src={
                      gifs[currentGif]
                        .url
                    }
                    alt="Celebration"
                    className="w-[280px] max-w-[75vw] rounded-3xl shadow-xl"
                  />

                  {/* GIF message */}

                  <motion.p
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.25,
                      duration: 0.45,
                    }}
                    className="mt-5 max-w-md text-center text-xl font-bold leading-tight text-rose-600 md:text-2xl"
                  >
                    {
                      gifs[
                        currentGif
                      ].message
                    }
                  </motion.p>

                </motion.div>

              </AnimatePresence>

            </div>

            {/* ================================= */}
            {/* FINAL MESSAGE */}
            {/* ================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
                duration: 0.7,
              }}
              className="mt-2"
            >

              <h1 className="text-3xl font-bold leading-tight text-rose-600 md:text-4xl">
                I knew it, you'd say yes. 🥹❤️
              </h1>

              <p className="mt-2 text-2xl font-bold text-gray-700 md:text-3xl">
                You're the best. 🫶
              </p>

              {/* Signature */}

              <p className="mt-6 text-sm font-medium tracking-wide text-gray-400">
                made by{' '}
                <span className="text-rose-500">
                  unpaidlyfintern
                </span>{' '}
                aka Punit
              </p>

            </motion.div>

          </div>

        </div>
      </div>
    );
  }

  /*
   * ========================================
   * PROPOSAL SCREEN
   * ========================================
   */
  return (
    <div className="relative flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 px-5">

      {/* Floating hearts */}

      <FloatingHearts
        count={25}
        dark={false}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.9,
        }}
        className="relative z-10 flex h-full w-full max-w-2xl flex-col items-center justify-center text-center"
      >

        {/* ================================= */}
        {/* ENVELOPE */}
        {/* ================================= */}

        <motion.div
          initial={{
            scale: 0,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            type: 'spring',
          }}
          className="mb-4 text-6xl md:text-7xl"
        >
          💌
        </motion.div>

        {/* ================================= */}
        {/* INTRO */}
        {/* ================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          className="text-base font-medium tracking-wide text-rose-500 md:text-lg"
        >
          I have a little question
          for you, Arushi. 🥹
        </motion.p>

        {/* ================================= */}
        {/* QUESTION */}
        {/* ================================= */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
          className="mt-3 text-5xl font-bold leading-[1.05] text-gray-800 md:text-7xl"
        >
          Can we talk on
          <br />

          <span className="text-rose-500">
           Call every day ?
          </span>{' '}
          ❤️
        </motion.h1>

        {/* ================================= */}
        {/* DESCRIPTION */}
        {/* ================================= */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.1,
          }}
          className="mt-4 max-w-md text-base leading-relaxed text-gray-600 md:text-lg"
        >
          I don't need a perfect
          answer...
          <br />
          just an honest one. 🥺
        </motion.p>

        {/* ================================= */}
        {/* BUTTON AREA */}
        {/* ================================= */}

        <div className="relative mt-9 h-[150px] w-full">

          {/* ================================= */}
          {/* INITIAL BUTTONS */}
          {/* ================================= */}

          {!noPosition && (
            <div className="absolute left-1/2 top-0 flex -translate-x-1/2 items-center gap-4">

              {/* YES */}

              <motion.button
                type="button"
                onClick={() =>
                  setAccepted(true)
                }
                animate={{
                  scale:
                    yesScale,
                }}
                whileHover={{
                  scale:
                    yesScale * 1.06,
                }}
                whileTap={{
                  scale:
                    yesScale * 0.95,
                }}
                className="h-[58px] w-[140px] rounded-full bg-rose-500 text-lg font-bold text-white shadow-xl shadow-rose-300/50 transition-colors hover:bg-rose-600"
              >
                YES ❤️
              </motion.button>

              {/* NO */}

              <motion.button
                ref={noButtonRef}
                type="button"
                onTouchStart={
                  handleTouch
                }
                onMouseDown={(
                  event
                ) => {
                  event.preventDefault();

                  escapeNoButton(
                    event.clientX,
                    event.clientY
                  );
                }}
                className="h-[58px] w-[140px] rounded-full bg-gray-200 text-lg font-bold text-gray-600 shadow-lg"
              >
                NO 😐
              </motion.button>

            </div>
          )}

          {/* ================================= */}
          {/* YES AFTER NO MOVES */}
          {/* ================================= */}

          {noPosition && (
            <motion.button
              type="button"
              onClick={() =>
                setAccepted(true)
              }
              animate={{
                scale:
                  yesScale,
              }}
              whileHover={{
                scale:
                  yesScale * 1.06,
              }}
              whileTap={{
                scale:
                  yesScale * 0.95,
              }}
              className="absolute left-1/2 top-0 h-[58px] w-[140px] -translate-x-[calc(100%+8px)] rounded-full bg-rose-500 text-lg font-bold text-white shadow-xl shadow-rose-300/50 transition-colors hover:bg-rose-600"
            >
              YES ❤️
            </motion.button>
          )}

          {/* ================================= */}
          {/* MOVING NO */}
          {/* ================================= */}

          {noPosition && (
            <motion.button
              ref={noButtonRef}
              type="button"
              onTouchStart={
                handleTouch
              }
              onMouseDown={(
                event
              ) => {
                event.preventDefault();

                escapeNoButton(
                  event.clientX,
                  event.clientY
                );
              }}
              initial={{
                left:
                  noPosition.left,
                top:
                  noPosition.top,
              }}
              animate={{
                left:
                  noPosition.left,
                top:
                  noPosition.top,
              }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
                mass: 0.8,
              }}
              className="fixed z-50 h-[58px] w-[140px] rounded-full bg-gray-200 text-lg font-bold text-gray-600 shadow-lg"
            >
              NO 😐
            </motion.button>
          )}

        </div>

        {/* ================================= */}
        {/* SARCASTIC MESSAGE */}
        {/* ================================= */}

        <div className="h-12">

          <AnimatePresence mode="wait">

            {message && (
              <motion.p
                key={message}
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -5,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="text-base font-bold tracking-wide text-rose-500 md:text-lg"
              >
                {message}
              </motion.p>
            )}

          </AnimatePresence>

        </div>

        {/* ================================= */}
        {/* ATTEMPT COUNTER */}
        {/* ================================= */}

        {attempts > 0 && (
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="mt-1 text-xs font-medium text-gray-400"
          >
            Attempts to escape:{' '}
            {attempts} 😭
          </motion.p>
        )}

        {/* ================================= */}
        {/* SIGNATURE */}
        {/* ================================= */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1.5,
          }}
          className="absolute bottom-5 left-0 right-0 text-xs font-medium tracking-wide text-gray-400 md:bottom-6 md:text-sm"
        >
          made by{' '}
          <span className="text-rose-500">
            unpaidlyfintern
          </span>{' '}
          aka Punit
        </motion.p>

      </motion.div>
    </div>
  );
}