import { RegisterForm } from '@/interfaces';
import MainLayout from '@/layouts/MainLayout';
import { register } from '@/services/auth';
import { Button, Form, Input, Result, Toast } from 'antd-mobile/es';
import { useState } from 'react';

const RegisterPage: React.FC = () => {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [form] = Form.useForm();

  const handleFormSubmit = (e: RegisterForm) => {
    delete e.passwordConfirm;
    register({ data: e }).then((res) => {
      if (res.success) {
        setRegisterSuccess(true);
      }
    });
  };

  return registerSuccess ? (
    <Result
      status="success"
      title="邮件已发送"
      description="请登录邮箱查收注册验证邮件"
    />
  ) : (
    <MainLayout title="注册">
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleFormSubmit}
        footer={
          <Button block type="submit" color="primary" size="large">
            注册
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
        <Form.Item
          label="确认密码"
          name="passwordConfirm"
          rules={[
            { required: true },
            {
              validator: (_: any, value: string) => {
                if (form.getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: '两次输入的密码不一致',
            },
          ]}
        >
          <Input placeholder="请再次输入密码" clearable type="password" />
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default RegisterPage;
