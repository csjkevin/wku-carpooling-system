import { LoginForm } from '@/interfaces';
import MainLayout from '@/layouts/MainLayout';
import { login } from '@/services/auth';
import { Button, Form, Input, Toast } from 'antd-mobile/es';
import { history } from 'umi';

const LoginPage: React.FC = () => {
  const from = history.location.query?.from;

  const handleFormSubmit = (e: LoginForm) => {
    login({ data: e }).then((res) => {
      if (res.success) {
        Toast.show({
          icon: 'success',
          content: '登录成功',
        });
        setTimeout(() => {
          history.replace(Array.isArray(from) ? from[0] : from || '/');
        }, 2000);
      }
    });
  };

  return (
    <MainLayout title="登录">
      <Form
        layout="horizontal"
        onFinish={handleFormSubmit}
        footer={
          <Button block type="submit" color="primary" size="large">
            登录
          </Button>
        }
      >
        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true },
            { pattern: /\w*@wku.edu.cn/, message: '请输入正确的 WKU 邮箱地址' },
          ]}
        >
          <Input placeholder="请输入邮箱" clearable />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true }]}>
          <Input placeholder="请输入密码" clearable type="password" />
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default LoginPage;
