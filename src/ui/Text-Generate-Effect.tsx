"use client";
import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "../lib/utils";

export const CustomTextGenerateEffect = ({
  words,
  aethronRef,
  className,
  filter = true,
  duration = 0.5,
  onComplete = () => {},
  pauseAnimation = false,
}) => {
  const [scope, animate] = useAnimate();
  const animationComplete = useRef(false);

  const defaultText =
    "Aetheron merges human intuition with machine precision, intelligence, redefined.";
  const inputText = typeof words === "string" && words.trim() ? words : defaultText;
  const wordsArray = inputText.split(" ");

  useEffect(() => {
    if (pauseAnimation) {
      animate(
        "span span.actual-text",
        {
          opacity: 0,
          filter: filter ? "blur(10px)" : "none",
        },
        { duration: 0.1 }
      );
      animationComplete.current = false;
      return;
    }

    const animation = animate(
      "span span.actual-text",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration || 1,
        delay: stagger(0.2),
      }
    );

    const totalDuration = duration + (wordsArray.length - 1) * 0.2 + 0.2;
    const timeoutId = setTimeout(() => {
      if (!animationComplete.current) {
        animationComplete.current = true;
        onComplete();
      }
    }, totalDuration * 1000);

    return () => {
      clearTimeout(timeoutId);
      animation.cancel();
    };
  }, [scope.current, animate, duration, filter, onComplete, pauseAnimation, wordsArray.length]);

  return (
    <div className={cn("font-bold", className)}>
      <motion.div ref={scope} className="flex flex-wrap">
        {wordsArray.map((word, idx) => {
          const isAetheron = word.toLowerCase() === "aetheron";

          return (
            <motion.span
              key={idx}
              className="mr-2 mb-1 relative inline-block"
            >
              <span className="invisible opacity-0 pointer-events-none">
                {isAetheron ? (
                  <span className="relative px-1 py-0 bg-gradient-to-r from-gray-900 via-zinc-500 to-gray-800 border border-zinc-400 inline-block rounded-md">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-zinc-100 to-gray-300">
                      {word}
                    </span>
                  </span>
                ) : (
                  word
                )}
              </span>

              <span
                className={cn(
                  "absolute top-0 left-0 opacity-0 actual-text",
                  !isAetheron && "text-black"
                )}
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
                ref={isAetheron ? aethronRef : undefined}
              >
                {isAetheron ? (
                  <span className="relative px-1 py-0 bg-gradient-to-r from-gray-900 via-zinc-500 to-gray-800 border border-zinc-400 inline-block rounded-md">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-zinc-100 to-gray-300">
                      {word}
                    </span>
                  </span>
                ) : (
                  word
                )}
              </span>
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
};
