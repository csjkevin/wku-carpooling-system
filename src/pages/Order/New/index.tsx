import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  TextArea,
  DatePicker,
  Stepper,
  NavBar,
  Toast,
} from 'antd-mobile/es';
import dayjs from 'dayjs';
import { history } from 'umi';
import { createOrder } from '@/services/order';
import { OrderForm } from '@/interfaces';

const NewOrderPage: React.FC = () => {
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleformSubmit = (e: OrderForm) => {
    createOrder({ data: e }).then((res) => {
      if (res.success) {
        Toast.show({
          icon: 'success',
          content: '创建成功',
        });
        setTimeout(() => {
          history.goBack();
        }, 2000);
      }
    });
  };

  return (
    <>
      <NavBar
        onBack={() => {
          history.goBack();
        }}
      >
        创建订单
      </NavBar>
      <Form
        name="form"
        layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
        onFinish={handleformSubmit}
      >
        <Form.Item
          name="fromAddress"
          label="出发地"
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入出发地" />
        </Form.Item>
        <Form.Item name="toAddress" label="目的地" rules={[{ required: true }]}>
          <Input placeholder="请输入目的地" />
        </Form.Item>
        <Form.Item
          name="departureTime"
          label="出发时间"
          trigger="onConfirm"
          onClick={() => {
            setPickerVisible(true);
          }}
          rules={[{ required: true }]}
        >
          <DatePicker
            visible={pickerVisible}
            precision="minute"
            onClose={() => {
              setPickerVisible(false);
            }}
          >
            {(value) =>
              value ? dayjs(value).format('YYYY-MM-DD HH:mm') : '请选择出发时间'
            }
          </DatePicker>
        </Form.Item>
        <Form.Item
          initialValue={1}
          rules={[
            {
              type: 'number',
              required: true,
              min: 1,
            },
          ]}
          name="capacity"
          label="可拼人数"
        >
          <Stepper />
        </Form.Item>
        <Form.Item
          name="remark"
          label="备注"
          help="如：想要提醒同行者的注意事项"
        >
          <TextArea
            placeholder="请输入备注"
            maxLength={100}
            rows={2}
            showCount
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default NewOrderPage;
