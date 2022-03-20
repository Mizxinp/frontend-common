/**
 * tezign ownership
 * @owner zhangxingping
 * @team M1
 */

import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import ExpandButton from './components/ExpandButton';
import styles from './index.module.scss';

interface IProps {
  title?: string;
  content: string;
  containerClass?: string;
  titleClass?: string;
  contentClass?: string;
  lineNumber?: number; // 显示几行
  lineHeight?: number;
  renderExpandButton?: (isShowAllContent: boolean) => React.ReactNode;
  extraInfo?: React.ReactNode;
}

const DEFAULT_BUTTON_HEIGHT = 25;
const DEFAULT_LINE_NUMBER = 2

const ExpandableContent = (props: IProps) => {
  const {
    title,
    content,
    containerClass,
    titleClass,
    contentClass,
    lineNumber = DEFAULT_LINE_NUMBER,
    renderExpandButton,
    lineHeight = DEFAULT_BUTTON_HEIGHT,
    extraInfo,
  } = props;

  const [showExpandButton, setShowExpandButton] = useState<boolean>(false);
  const [isShowAllContent, setIsShowAllContent] = useState<boolean>(false);
  const [buttonHeight, setButtonHeight] = useState<number>(DEFAULT_BUTTON_HEIGHT);

  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineNumber * lineHeight < Math.floor(contentRef?.current?.scrollHeight || 0)) {
      setShowExpandButton(true);
    }
    buttonRef?.current?.clientHeight && setButtonHeight(buttonRef?.current?.clientHeight)
  }, [lineNumber, lineHeight]);

  const handleExpandOrFold = () => setIsShowAllContent((pre) => !pre);

  const button =
    typeof renderExpandButton === 'function' ? (
      renderExpandButton(isShowAllContent)
    ) : (
      <ExpandButton isShowAllContent={isShowAllContent} />
    );

  if (!title && !content) return null;

  return (
    <div className={classnames(styles.container, containerClass)}>
      <div
        className={classnames(styles.title, titleClass, {
          [styles.noContent]: !content,
        })}
      >
        {title}
      </div>
      {extraInfo}
      {content && (
        <div className={styles.wrapper}>
          <div
            className={classnames(styles.content, contentClass)}
            style={{
              maxHeight: isShowAllContent ? 'none' : `${lineNumber * lineHeight}px`,
              lineHeight: `${lineHeight}px`,
            }}
            ref={contentRef}
          >
            <div className={styles.before} style={{ height: `calc(100% - ${buttonHeight}px)` }} />
            <div
              className={classnames(styles.btnWrap, {
                [styles.showBtn]: showExpandButton,
                [styles.hideBtn]: !showExpandButton,
              })}
              ref={buttonRef}
            >
              {!isShowAllContent && (
                <div className={classnames(styles.ellipsis)}>...</div>
              )}
              <div onClick={handleExpandOrFold} className={styles.btn}>
                {button}
              </div>
            </div>
            <div>{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableContent;
