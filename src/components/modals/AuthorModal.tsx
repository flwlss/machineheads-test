import { Button, Form, Input, Modal, Upload, type FormProps } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/reducers";
import type { UploadChangeParam } from "antd/es/upload";
import type { DetailAuthor } from "../../types/authors";
import { createAuthorRequest, editAuthorRequest } from "../../store/actions/author";
import { setValidationError } from "../../store/actions";

type FieldType = {
  name: string;
  lastName: string;
  secondName: string;
  shortDescription: string;
  description: string;
  avatar: File;
};

interface IAuthorModal {
  isOpened: boolean;
  setOpen: () => void;
  author?: DetailAuthor;
}

const AuthorModal = ({ isOpened, setOpen, author }: IAuthorModal) => {
  const dispatch = useDispatch();
  const validationErrors = useSelector((state: RootState) => state.error.validationErrors);
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('lastName', values.lastName);
    values.secondName && formData.append('secondName', values.secondName);
    values.shortDescription && formData.append('shortDescription', values.shortDescription);
    values.description && formData.append('description', values.description);
    file && formData.append('avatar', file);

    author ? dispatch(editAuthorRequest(author.id, formData)) : dispatch(createAuthorRequest(formData));
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return validationErrors?.find(error => error.field === fieldName)?.message;
  };

  const handleFileChange = (info: UploadChangeParam) => {
    if (info.file.originFileObj) {
      setFile(info.file.originFileObj);
    }
  };

  const handleSubmit = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen()
    form.resetFields()
    setFile(null);
    dispatch(setValidationError(null))
  };

  useEffect(() => {
    if (author && isOpened) {
      form.setFieldsValue({
        name: author.name,
        lastName: author.lastName,
        secondName: author.secondName,
        shortDescription: author.shortDescription,
        description: author.description,
      });

      if (author?.avatar?.url) {
        setImageUrl(author?.avatar?.url)
      }
    } else {
      form.resetFields()
      setFile(null);
    }
  }, [author, isOpened, form]);

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [file]);

  return (
    <Modal
      open={isOpened}
      title={author ? 'Редактировать автора' : 'Создать автора'}
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
        labelCol={{ span: 7 }}
        onFinish={onFinish}
      >
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
          label="LastName"
          name="lastName"
          rules={[{ required: true, message: 'Please input your lastName!' }]}
          help={getFieldError('lastName')}
          validateStatus={getFieldError('lastName') ? 'error' : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="SecondName"
          name="secondName"
          help={getFieldError('secondName')}
          validateStatus={getFieldError('secondName') ? 'error' : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="ShortDescription"
          name="shortDescription"
          help={getFieldError('shortDescription')}
          validateStatus={getFieldError('shortDescription') ? 'error' : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Description"
          name="description"
          help={getFieldError('description')}
          validateStatus={getFieldError('description') ? 'error' : ''}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Avatar"
          name="avatar"
          valuePropName="fileList"
          getValueFromEvent={e => e && e.fileList}
          help={getFieldError('avatar')}
          validateStatus={getFieldError('avatar') ? 'error' : ''}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            onChange={handleFileChange}
          >
            {imageUrl && !file ? (
              <img
                src={imageUrl}
                alt="Preview"
                className="prewiewAvatar"
              />
            ) : file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="New preview"
                className="prewiewAvatar"
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AuthorModal;