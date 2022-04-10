import { getMyProfile } from '@/services/my';
import { history, useModel } from 'umi';

const AuthLayout: React.FC = ({ children }) => {
  const { user, setUser } = useModel('user', (model) => ({
    user: model.user,
    setUser: model.setUser,
  }));
  const currentPath = history.location.pathname;

  if (!user) {
    getMyProfile()
      .then((res) => {
        if (res.success) {
          setUser(res.data);
        } else {
          throw 'authorization required';
        }
      })
      .catch((err) => {
        history.push(`/login?from=${currentPath}`);
        return null;
      });
  }

  return <>{children}</>;
};

export default AuthLayout;
