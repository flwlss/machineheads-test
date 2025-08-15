import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { LOGIN_REQUEST } from '../store/constants';

type FieldType = {
	email?: string;
	password?: string;
};

const AuthForm = () => {
	const dispatch = useDispatch();
	const navigate = useHistory()

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		dispatch({
			type: LOGIN_REQUEST,
			payload: {
				email: values.email,
				password: values.password
			}
		});
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
				<Button onClick={() => {
					navigate.push('/authors')
				}} type="primary" htmlType="button">
					authors
				</Button>
				<Button onClick={() => {
					navigate.push('/posts')
				}} type="primary" htmlType="button">
					posts
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AuthForm