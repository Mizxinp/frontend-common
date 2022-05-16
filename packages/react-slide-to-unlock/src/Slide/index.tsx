import React, { FC, useRef, useState, useCallback, useMemo } from 'react';
import rightIcon from './right_icon.svg';
import styles from './index.module.css';

enum SlidingStatus {
  Initial = 'initial',
  Success = 'success',
}

interface IProps {
  onSuccess: () => void;
  onFail?: () => void;
  className?: string;
  buttonClassName?: string;
  initPlaceholder?: string;
  successPlaceholder?: string;
  customConfig?: (status: SlidingStatus) => { placeholderText: string; icon: React.ReactNode };
  successColor?: string;
}

const SlidingUnlock: FC<IProps> = (props) => {
  const {
    onSuccess,
    onFail,
    className,
    buttonClassName,
    customConfig,
    initPlaceholder = '请按住滑块，拖动到最右边',
    successPlaceholder = '验证通过',
    successColor = '#0cc5ae',
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const mouseDownX = useRef<number>(0);

  const [status, setStatus] = useState(SlidingStatus.Initial);

  const startSlide = useCallback(
    (clientX: number) => {
      if (status === SlidingStatus.Success) return;
      mouseDownX.current = clientX;
      bgRef.current!.style.transition = '';
      btnRef.current!.style.transition = '';

      listenEvent();
    },
    [status],
  );

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      startSlide(e.clientX);
    },
    [startSlide],
  );

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      startSlide(e?.touches[0]?.clientX);
    },
    [startSlide],
  );

  const handleMove = useCallback(
    (clientX: number) => {
      try {
        const moveX = clientX;
        const distance = containerRef.current!.offsetWidth - btnRef.current!.offsetWidth;
        let offsetX = moveX - mouseDownX.current;

        if (offsetX > distance) {
          offsetX = distance;
        } else if (offsetX < 0) {
          offsetX = 0;
        }

        btnRef.current!.style.left = `${offsetX}px`;
        bgRef.current!.style.width = `${offsetX}px`;

        if (offsetX === distance) {
          setStatus(SlidingStatus.Success);
          bgRef.current!.style.backgroundColor = successColor;
          onSuccess?.();
          clearEvent();
        }
      } catch (error) {
        console.error(error);
        clearEvent();
      }
    },
    [onSuccess],
  );

  const handleMouseUp = useCallback(() => {
    if (status === SlidingStatus.Success) return;
    btnRef.current!.style.left = '0px';
    bgRef.current!.style.width = '0px';
    btnRef.current!.style.transition = 'left 1s ease';
    bgRef.current!.style.transition = 'width 1s ease';
    onFail?.();
    clearEvent();
  }, [status, onFail]);

  const handleTouchmove = useCallback(
    (e: TouchEvent) => {
      handleMove(e?.touches[0]?.clientX);
    },
    [handleMove],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      handleMove(e?.clientX);
    },
    [handleMove],
  );

  const listenEvent = useCallback(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchmove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
  }, [handleMouseMove, handleMouseUp, handleTouchmove]);

  const clearEvent = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('touchmove', handleTouchmove);
    document.removeEventListener('touchend', handleMouseUp);
  }, [handleMouseMove, handleMouseUp, handleTouchmove]);

  const config = useMemo(() => {
    return {
      [SlidingStatus.Initial]: {
        placeholderText: initPlaceholder,
        icon: <img src={rightIcon} />,
      },
      [SlidingStatus.Success]: {
        placeholderText: successPlaceholder,
        icon: (
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="0.557861"
              width="16"
              height="16"
              rx="8"
              fill={`${successColor || '#0cc5ae'}`}
            />
            <path
              d="M7.07125 11.0001L4.31438 8.24326C4.14081 8.06969 3.85941 8.06969 3.68584 8.24326C3.51227 8.41682 3.51227 8.69823 3.68584 8.8718L6.79695 11.9829C6.98536 12.1713 7.29607 12.1527 7.4607 11.9432L12.3496 5.721C12.5012 5.52799 12.4677 5.24859 12.2747 5.09694C12.0817 4.94529 11.8023 4.97882 11.6506 5.17183L7.07125 11.0001Z"
              fill="white"
            />
          </svg>
        ),
      },
    };
  }, [initPlaceholder, successPlaceholder, successColor]);

  const { placeholderText, icon } =
    typeof customConfig === 'function' ? customConfig(status) : config[status];

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      <div className={`${styles.bg}`} ref={bgRef} style={{ backgroundColor: successColor }} />
      <div className={styles.textWrap}>
        <div className={styles.text}>{placeholderText}</div>
      </div>
      <div
        className={`${styles.btn} ${buttonClassName}`}
        ref={btnRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {icon}
      </div>
    </div>
  );
};

export default SlidingUnlock;
