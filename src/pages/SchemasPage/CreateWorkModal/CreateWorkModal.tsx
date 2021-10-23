import { Button, Modal, Form, Input, message } from 'antd';
import { FC, useState } from 'react';
import { useHistory } from 'react-router';
import { createWork } from 'src/core/functions/createWork';
import { Schema } from 'src/core/types';
import { WORKS_PATHNAME } from 'src/pages/WorksPage/constants';
import { useAppStorage } from 'src/storage/AppStorageContext';
import styles from './CreateWorkModal.module.scss';

type Props = {
  schema?: Schema;
  onCancel?: () => void;
};

export const CreateWorkModal: FC<Props> = ({ schema, onCancel }) => {
  const appStorage = useAppStorage();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    if (schema) {
      const action = async () => {
        setLoading(true);
        try {
          const work = createWork(values.name, schema);
          await appStorage.add('works', work);
          history.push(WORKS_PATHNAME);
        } catch (error) {
          if (error instanceof Error) {
            message.error(error.message);
          } else {
            message.error('Unknown error');
          }
        } finally {
          setLoading(false);
        }
      };

      action();
    }
  };

  return (
    <Modal
      title="Create work"
      visible={!!schema}
      closable
      onCancel={onCancel}
      width="400px"
      footer={null}
      centered
    >
      <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
        <p>Based on schema: {schema?.metadata.name}</p>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Required field' }]}
        >
          <Input />
        </Form.Item>
        <Button
          loading={loading}
          className={styles.button}
          htmlType="submit"
          type="primary"
        >
          Create
        </Button>
      </Form>
    </Modal>
  );
};