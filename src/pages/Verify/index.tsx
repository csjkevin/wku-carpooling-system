import { verify } from '@/services/auth';
import { Result } from 'antd-mobile/es';
import { useEffect, useState } from 'react';
import { Link, history } from 'umi';

const VerifyPage: React.FC = () => {
  const [verifyState, setVerifyState] = useState<'' | 'success' | 'fail'>('');

  const { query } = history.location;
  const { email, token } = query || {};

  useEffect(() => {
    if (email && token) {
      verify({
        params: {
          email: Array.isArray(email) ? email[0] : email,
          token: Array.isArray(token) ? token[0] : token,
        },
      }).then((res) => {
        if (res.success) {
          setVerifyState('success');
        } else {
          setVerifyState('fail');
        }
      });
    }
  }, [email, token]);

  return verifyState ? (
    verifyState === 'success' ? (
      <Result
        status="success"
        title="验证成功"
        description={<Link to="/">进入系统</Link>}
      />
    ) : (
      <Result
        status="error"
        title="验证失败"
        description={
          <>
            请尝试再次 <Link to="/register">注册</Link>
          </>
        }
      />
    )
  ) : (
    <Result status="waiting" title="验证中" description="请稍后" />
  );
};

export default VerifyPage;
