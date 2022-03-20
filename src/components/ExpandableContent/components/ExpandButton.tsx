
import styles from './ExpandButton.module.scss';

interface IProps {
  isShowAllContent: boolean;
  expandText?: string;
}

const ExpandButton = (props: IProps) => {
  const { isShowAllContent, expandText } = props;
  return (
    <>
      <div className={styles.btnText}>{isShowAllContent ? '收起' : `${expandText || '展开'}`}</div>
    </>
  );
};

export default ExpandButton;
