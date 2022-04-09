import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, NavBar, Toast } from 'antd-mobile/es';
import { history } from 'umi';
import { AddSquareOutline } from 'antd-mobile-icons';
import { Order } from '@/interfaces';
import { getAllOrders } from '@/services/order';
import dayjs from 'dayjs';

import styles from './index.less';
import MainLayout from '@/layouts/MainLayout';

const OrderPage: React.FC = () => {
  const [orderList, setOrderList] = useState<Order[]>();
  const [appliedOrderIds, setAppliedOrderIds] = useState<number[]>([]);

  useEffect(() => {
    getAllOrders().then((res) => {
      if (res.success && Array.isArray(res.data)) {
        setOrderList(res.data.reverse());
      }
    });
  }, []);

  const navRight = (
    <div style={{ fontSize: 24 }}>
      <AddSquareOutline
        onClick={() => {
          history.push('/order/new');
        }}
      />
    </div>
  );

  const cardsRender = (list?: Order[]) =>
    Array.isArray(list)
      ? list.map((item) => {
          const applied = appliedOrderIds.includes(item.id);
          return (
            <Card key={item.id} className={styles.orderCard}>
              <ul>
                <li className={styles.from}>{item.fromAddress}</li>
                <li className={styles.to}>{item.toAddress}</li>
              </ul>
              <div className={styles.content}>
                <p>
                  可拼 {item.capacity} 人，
                  {dayjs(item.departureTime).format(
                    'YYYY 年 M 月 D 日 HH:mm',
                  )}{' '}
                  出发
                </p>
                {item.remark ? <p>{item.remark}</p> : null}
              </div>
              <div className={styles.footer}>
                {applied ? (
                  <Button
                    className={styles.button}
                    color="danger"
                    onClick={() => {
                      Dialog.confirm({
                        content: '取消加入该行程',
                        onConfirm: async () => {
                          setAppliedOrderIds((prevState) =>
                            prevState.filter((id) => id !== item.id),
                          );
                          Toast.show({
                            icon: 'success',
                            content: '已取消',
                          });
                        },
                      });
                    }}
                  >
                    取消申请
                  </Button>
                ) : null}
                <Button
                  className={styles.button}
                  color="primary"
                  onClick={() => {
                    Dialog.confirm({
                      content:
                        '申请加入该行程。行程发起人同意后，可查看联系信息。',
                      onConfirm: async () => {
                        setAppliedOrderIds((prevState) => [
                          ...prevState,
                          item.id,
                        ]);
                        Toast.show({
                          icon: 'success',
                          content: '已申请',
                        });
                      },
                    });
                  }}
                  disabled={applied}
                >
                  申请加入
                </Button>
              </div>
            </Card>
          );
        })
      : null;

  return (
    <MainLayout title="温肯拼车" navRight={navRight}>
      {cardsRender(orderList)}
    </MainLayout>
  );
};

export default OrderPage;
