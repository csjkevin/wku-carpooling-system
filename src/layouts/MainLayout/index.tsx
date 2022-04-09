import { NavBar } from 'antd-mobile/es';
import { history } from 'umi';

import styles from './index.less';

interface Props {
  title?: React.ReactNode;
  navRight?: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ title, navRight, children }) => {
  const canBack = history.length > 1;

  return (
    <>
      <div className={styles.header}>
        <NavBar
          {...(canBack
            ? {
                onBack: () => {
                  history.goBack();
                },
              }
            : { back: '', backArrow: null })}
          right={navRight}
        >
          {title}
        </NavBar>
      </div>
      {children}
    </>
  );
};

export default MainLayout;
