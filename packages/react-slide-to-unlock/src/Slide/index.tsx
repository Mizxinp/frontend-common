import React, { FC, useRef, useEffect, useState, useCallback } from 'react';
import successIcon from './success_icon.svg';
import rightIcon from './right_icon.svg';
import styles from './index.module.css';

enum SlidingStatus {
  Initial,
  Success,
}

const meta = {
  [SlidingStatus.Initial]: {
    placeholderText: '请按住滑块，拖动到最右边',
    icon: <img src={rightIcon} />,
  },
  [SlidingStatus.Success]: {
    placeholderText: '验证通过',
    icon: <img src={successIcon} style={{ width: 16 }} />,
  },
};

interface IProps {
  onSuccess: () => void;
  onFail?: () => void;
  initText?: string | React.ReactNode;
  successText?: string | React.ReactNode;
  className?: string;
  customBtn?: React.ReactNode;
}

const SlidingUnlock: FC<IProps> = (props) => {
  const { onSuccess, onFail } = props;
  const containerRef = useRef<any>();
  const bgRef = useRef<any>();
  const btnRef = useRef<any>();
  const isMouseDown = useRef<boolean>(false);
  const mouseDownX = useRef<number>(0);

  const [status, setStatus] = useState(SlidingStatus.Initial);

  const { placeholderText, icon } = meta[status];

  const handleStartSlide = useCallback(
    (event: any) => {
      if (status === SlidingStatus.Success) return;
      mouseDownX.current = event.clientX || event?.touches[0];
      bgRef.current.style.transition = '';
      btnRef.current.style.transition = '';
      isMouseDown.current = true;
    },
    [status],
  );

  const handleMouseMove = useCallback(
    (e: any) => {
      if (!isMouseDown.current) return;
      e.preventDefault();
      try {
        const moveX = e.clientX || e?.touches[0];
        const distance = containerRef.current.offsetWidth - btnRef.current.offsetWidth;
        let offsetX = moveX - mouseDownX.current;

        if (offsetX > distance) {
          offsetX = distance;
        } else if (offsetX < 0) {
          offsetX = 0;
        }

        btnRef.current.style.left = `${offsetX}px`;
        bgRef.current.style.width = `${offsetX}px`;

        if (offsetX === distance) {
          setStatus(SlidingStatus.Success);
          bgRef.current.style.backgroundColor = '#32B0F6';
          isMouseDown.current = false;
          onSuccess?.();
        }
      } catch (error) {
        console.error(error);
      }
    },
    [onSuccess],
  );

  const handleMouseUp = useCallback(() => {
    if (status === SlidingStatus.Success || !isMouseDown.current) return;
    onFail?.();
    isMouseDown.current = false;
    btnRef.current.style.left = 0;
    bgRef.current.style.width = 0;
    btnRef.current.style.transition = 'left 1s ease';
    bgRef.current.style.transition = 'width 1s ease';
  }, [status, onFail]);

  const clearEvent = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleMouseMove);
    document.removeEventListener('touchend', handleMouseUp);
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);
    return () => {
      clearEvent();
    };
  }, [clearEvent, handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.bg} ref={bgRef} />
      <div className={styles.textWrap}>
        <div className={styles.text}>{placeholderText}</div>
      </div>
      <div
        className={styles.btn}
        ref={btnRef}
        onMouseDown={handleStartSlide}
        onTouchStart={handleStartSlide}
      >
        {icon}
      </div>
    </div>
  );
};

export default SlidingUnlock;
