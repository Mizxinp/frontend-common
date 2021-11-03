import React from 'react';
import classnames from 'classnames';
import styles from './index.module.scss';

interface IProps {
  /** 标题 */
  title?: string | React.ReactNode;
  /** 子组件 */
  children: React.ReactNode;
  /** 右边组件 */
  rightContent?: React.ReactNode;
  /** 额外信息 */
  extraInfo?: React.ReactNode | string;
  /** 组件类名 */
  className?: string;
  /** title容器类名 */
  titleWrapClassName?: string;
  /** 额外展示信息是否独占一行 */
  isExtraInfoNeedOneLineDisplay?: boolean;
  /** 容器id */
  id?: string;
}

function Panel(props: IProps) {
  const {
    title, children, rightContent, extraInfo, className, titleWrapClassName,
    isExtraInfoNeedOneLineDisplay = false, id
  } = props;
  return (
    <div className={classnames(styles.container, className)} id={id}>
      <div className={classnames(styles.top, {
        [styles.mb24]: !isExtraInfoNeedOneLineDisplay,
      })}>
        <div className={classnames(styles.titleWrap, titleWrapClassName)}>
          <div className={styles.title}>{title}</div>
          {extraInfo && !isExtraInfoNeedOneLineDisplay && <div className={styles.extra}>{extraInfo}</div>}
        </div>
        {rightContent}
      </div>
      {extraInfo && isExtraInfoNeedOneLineDisplay && <div className={styles.extraOneLine}>{extraInfo}</div>}
      {children}
    </div>
  );
}

export default Panel;
