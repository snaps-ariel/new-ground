import { Form, Input } from 'antd';

type Props = {
  name: number;
  type: string;
};

export default function ActionForms({ name, type }: Props) {
  switch (type) {
    case 'getCoupon':
      return (
        <Form.Item
          style={{ marginBottom: '0' }}
          label="Item"
          name={[name, 'desc', 'getCoupon_code']}
        >
          <Input />
        </Form.Item>
      );
    case 'goLink':
      return (
        <Form.Item
          style={{ marginBottom: '0' }}
          label="Item"
          name={[name, 'desc', 'goLink_url']}
        >
          <Input />
        </Form.Item>
      );

    default:
      null;
      break;
  }
}
