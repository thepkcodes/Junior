import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MultiTypewriter } from './Typewriter';
import SoftButton from './SoftButton';
import Sparkles from './Sparkles';
import SceneShell from './SceneShell';

/**
 * ============================================================
 *  💖 For You, My Pookie
 *  🧑‍💻 Crafted with love by unpaidlyfintern aka Punit
 * ============================================================
 */

interface Props {
  onRestart: () => void;
}

const INTRO = [
  "okay.",
  "deep breath.",
  '',
  "i didn't make this to be impressive.",
  "i made it because sometimes my chest gets so full of you",
  "that texts and voice notes just… aren't enough.",
  '',
  "you are my universe to be fan of.",
  "my soft place to land.",
  "the person i want to tell everything to — even the boring parts.",
  '',
  "so i'll say this as simply as i know how:",
];

const YES_LINES = [
  "of course you said yes.",
  "you always make the brave, soft choice.",
  '',
  "thank you for being mine.",
  "thank you for being you.",
  '',
  "i promise to keep choosing you —",
  "on the bright days, the quiet days,",
  "and every messy, beautiful one in between.",
  '',
  "forever yours,",
  "your pookie-obsessed person 💕",
];

export default function FinalSurprise({ onRestart }: Props) {
  const [stage, setStage] = useState<'intro' | 'ask' | 'yes'>('intro');
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesDone, setYesDone] = useState(false);

  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        emoji: ['✨', '💕', '🌸', '💖', '🎀', '🌷', '💗'][i % 7],
        angle: (i / 24) * Math.PI * 2,
        dist: 110 + (i % 4) * 28,
      })),
    [],
  );

  const dodge = () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = 90 + Math.random() * 120;
    setNoPos({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    setNoCount((c) => c + 1);
  };

  const noLabel =
    noCount === 0
      ? 'no'
      : noCount === 1
      ? 'wait…'
      : noCount === 2
      ? 'hmm no'
      : noCount === 3
      ? 'nice try'
      : 'you know you want to';

  return (
    <SceneShell dark className="flex items-center justify-center overflow-hidden bg-starlight px-5 py-24">
      <Sparkles count={70} />

      {/* Gentle floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="heart-float"
            style={{
              left: `${(i * 17 + 5) % 100}%`,
              animationDelay: `${(i * 0.7) % 12}s`,
              animationDuration: `${14 + (i % 5) * 2}s`,
              fontSize: `${14 + (i % 4) * 6}px`,
              filter: 'drop-shadow(0 0 8px rgba(255,182,209,0.75))',
            }}
          >
            {['💖', '💗', '💕', '✨'][i % 4]}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center text-white">
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.div
              key="intro"
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-6 text-[11px] tracking-[0.32em] text-rose-200/80 uppercase">
                the part i practiced in my head
              </p>

              <MultiTypewriter
                lines={INTRO}
                speed={30}
                linePause={420}
                startDelay={500}
                onDone={() => setTimeout(() => setStage('ask'), 900)}
                className="min-h-[280px] font-serif text-lg leading-relaxed text-white/95 md:text-xl"
                caretClassName="text-rose-300"
                lineClassName={(_line, i) => {
                  if (i === 0 || i === 1) return 'font-script text-3xl text-pink-200 md:text-4xl';
                  return '';
                }}
              />
            </motion.div>
          )}

          {stage === 'ask' && (
            <motion.div
              key="ask"
              initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.04, filter: 'blur(6px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 140, damping: 12 }}
                className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-pink-600 text-5xl shadow-2xl pulse-glow heartbeat"
              >
                💖
              </motion.div>

              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.8 }}
                  className="font-serif text-2xl text-white/90 md:text-3xl"
                >
                  will you keep being
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.9 }}
                  className="mt-1 font-script text-5xl leading-tight text-gradient-love md:text-7xl"
                >
                  my forever person?
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1 }}
                className="mx-auto max-w-md font-serif text-base italic text-rose-100/80 md:text-lg"
              >
                not just for the pretty days.
                for the quiet ones, the hard ones,
                and every ordinary tuesday after that.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.9, duration: 0.8 }}
                className="relative flex min-h-[80px] flex-wrap items-center justify-center gap-4 pt-2"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStage('yes')}
                  animate={{
                    scale: 1 + Math.min(noCount * 0.08, 0.55),
                  }}
                  className="rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500 px-10 py-4 text-lg font-semibold text-white shadow-2xl shadow-rose-500/40"
                >
                  yes. always. 💕
                </motion.button>

                <motion.button
                  type="button"
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                  onMouseEnter={dodge}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    dodge();
                  }}
                  onClick={dodge}
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm text-white/90 backdrop-blur-md"
                >
                  {noLabel}
                </motion.button>
              </motion.div>

              {noCount > 1 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-script text-lg text-rose-200/90"
                >
                  {noCount > 3
                    ? "okay that button is officially scared of you 🥺"
                    : "that button is a little shy…"}
                </motion.p>
              )}
            </motion.div>
          )}

          {stage === 'yes' && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              {/* Burst */}
              <div className="relative mx-auto h-40 w-40">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.4, 1], opacity: 1 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center text-8xl"
                >
                  💖
                </motion.div>
                {particles.map((p, i) => (
                  <motion.span
                    key={p.id}
                    initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0.8, 0],
                      x: Math.cos(p.angle) * p.dist,
                      y: Math.sin(p.angle) * p.dist,
                      scale: [0, 1.15, 0.9],
                    }}
                    transition={{ duration: 1.7, delay: 0.15 + i * 0.03 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl"
                  >
                    {p.emoji}
                  </motion.span>
                ))}
              </div>

              <MultiTypewriter
                lines={YES_LINES}
                speed={32}
                linePause={400}
                startDelay={900}
                onDone={() => setYesDone(true)}
                className="min-h-[260px] font-serif text-lg leading-relaxed text-rose-50 md:text-xl"
                caretClassName="text-rose-300"
                lineClassName={(line, i) => {
                  if (i === 0) return 'font-script text-4xl text-gradient-love md:text-5xl';
                  if (line.startsWith('forever') || line.startsWith('your pookie')) {
                    return 'font-script text-2xl text-pink-200';
                  }
                  return '';
                }}
              />

              {yesDone && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex flex-wrap items-center justify-center gap-3 pt-4"
                >
                  <SoftButton onClick={onRestart} variant="ghost" className="!border-white/30 !text-white !bg-white/10 hover:!bg-white/20">
                    ↺ experience again
                  </SoftButton>
                  <SoftButton
                    variant="light"
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: 'For you 💕',
                            text: 'Someone made this for me…',
                            url: window.location.href,
                          })
                          .catch(() => {});
                      } else {
                        navigator.clipboard?.writeText(window.location.href);
                      }
                    }}
                  >
                    💌 hold onto this
                  </SoftButton>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneShell>
  );
}
