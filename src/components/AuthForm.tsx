import type { FormProps } from 'antd';
import { Button, Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST } from '../store/constants';
import type { RootState } from '../store/reducers';

type FieldType = {
	email?: string;
	password?: string;
};

const AuthForm = () => {
	const dispatch = useDispatch();
	const authError = useSelector((state: RootState) => state.error.authError);

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		dispatch({
			type: LOGIN_REQUEST,
			payload: {
				email: values.email,
				password: values.password
			}
		});
	};

	return (
		<Form
			name="basic"
			labelCol={{ span: 8 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item<FieldType>
				label="Email"
				name="email"
				rules={[{ required: true, message: 'Please input your email!', type: 'email', validateTrigger: 'onSubmit' }]}
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

			{authError && <Typography.Text className='authErrorMessage' type='danger'>{authError}</Typography.Text>}

			<Form.Item label={null}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default AuthForm