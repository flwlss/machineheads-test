import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
	email?: string;
	password?: string;
};

const AuthForm = () => {
	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item<FieldType>
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<FieldType>
				label="Password"
				name="password"
				rules={[{ required: true, message: 'Please input your password!' }]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AuthForm