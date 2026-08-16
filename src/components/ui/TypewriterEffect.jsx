import React, { useState, useEffect, useRef } from 'react';
import styles from './TypewriterEffect.module.css';

const TypewriterEffect = ({ texts = [], speed = 90, deleteSpeed = 50, pauseTime = 4000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentTextIndex = loopNum % texts.length;
    const fullText = texts[currentTextIndex];

    const handleTyping = () => {
      setDisplayedText(prev => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        } else {
          return fullText.substring(0, prev.length + 1);
        }
      });
    };

    let nextDelay = isDeleting ? deleteSpeed : speed;

    if (!isDeleting && displayedText === fullText) {
      nextDelay = pauseTime;
      setIsDeleting(true);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      nextDelay = 500; // Pause before typing next text
    }

    typingTimeoutRef.current = setTimeout(handleTyping, nextDelay);

    return () => clearTimeout(typingTimeoutRef.current);
  }, [displayedText, isDeleting, loopNum, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={styles.typewriter}>
      {displayedText}
      <span className={styles.cursor}>|</span>
    </span>
  );
};

export default TypewriterEffect;
