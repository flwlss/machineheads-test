import { Button, Form, Input, Modal, type FormProps } from "antd"
import { useEffect } from "react";
import { SET_TAG_VALIDATION_ERRORS } from "../../store/constants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/reducers";
import type { Tag } from "../../types/tags";
import { createTagRequest, editTagRequest } from "../../store/actions/tag";

type FieldType = {
  code: string;
  name: string;
  sort: number;
};

interface ITagModal {
  isOpened: boolean;
  setOpen: () => void;
  tag?: Tag;
}

const TagModal = ({ isOpened, setOpen, tag }: ITagModal) => {
  const dispatch = useDispatch();
  const validationErrors = useSelector((state: RootState) => state.error.tagErrors);
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formData = new FormData();

    formData.append('code', values.code);
    formData.append('name', values.name);
    values.sort && formData.append('sort', values.sort.toString());

    tag ? dispatch(editTagRequest(tag.id, formData)) : dispatch(createTagRequest(formData));;
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors?.find(error => error.field === fieldName)?.message;
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen()
    form.resetFields()
    dispatch({ type: SET_TAG_VALIDATION_ERRORS, payload: null })
  };

  useEffect(() => {
    if (tag && isOpened) {
      form.setFieldsValue({
        code: tag.code,
        name: tag.name,
        sort: tag.sort,
      });
    } else {
      form.resetFields()
    }
  }, [tag, isOpened, form]);

  return (
    <Modal
      open={isOpened}
      title={tag ? 'Редактировать тег' : 'Создать тег'}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel} key="back" >
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Code"
          name="code"
          rules={[{ required: true, message: 'Please input your code!' }]}
          help={getFieldError('code')}
          validateStatus={getFieldError('code') ? 'error' : ''}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          help={getFieldError('name')}
          validateStatus={getFieldError('name') ? 'error' : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Sort"
          name="sort"
          help={getFieldError('sort')}
          validateStatus={getFieldError('sort') ? 'error' : ''}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default TagModal;