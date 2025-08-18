import { Button, Form, Input, Modal, Select, Upload, type FormProps } from "antd"
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { SET_ALL_AUTHORS_TO_SELECT, SET_ALL_TAGS_TO_SELECT } from "../../store/constants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/reducers";
import { createPostRequest } from "../../store/actions";
import type { UploadChangeParam } from "antd/es/upload";

type FieldType = {
  code: string;
  title: string;
  authorId: number;
  tagIds: number[];
  text: string;
  previewPicture: File;
};

interface IPostModal {
  isOpened: boolean;
  setOpen: () => void;
}

const PostModal = ({ isOpened, setOpen }: IPostModal) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const allTags = useSelector((state: RootState) => state.content.allTags)
  const allAuthors = useSelector((state: RootState) => state.content.allAuthors)
  const [file, setFile] = useState<File | null>(null);

  const tagOptions = allTags?.map((item) => ({
    label: item.name,
    value: item.id,
    key: item.id
  }))

  const authorOptions = allAuthors?.map((item) => ({
    label: item.name,
    value: item.id,
    key: item.id
  }))

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    const formData = new FormData();

    formData.append('code', values.code);
    formData.append('title', values.title);
    formData.append('authorId', values.authorId.toString());
    values.tagIds && values.tagIds.forEach(id => formData.append('tagIds[]', id.toString()));
    formData.append('text', values.text);
    if (file) {
      formData.append('previewPicture', file);
    }

    dispatch(createPostRequest(formData));
    setOpen()
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
  };

  useEffect(() => {
    dispatch({ type: SET_ALL_TAGS_TO_SELECT })
    dispatch({ type: SET_ALL_AUTHORS_TO_SELECT })
  }, [])

  return (
    <Modal
      open={isOpened}
      title="Title"
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
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input your title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="AuthorId"
          name="authorId"
          rules={[{ required: true, message: 'Please input your authorId!' }]}
        >
          <Select options={authorOptions} />
        </Form.Item>
        <Form.Item<FieldType>
          label="TagIds"
          name="tagIds"
        >
          <Select mode="multiple" options={tagOptions} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Text"
          name="text"
          rules={[{ required: true, message: 'Please input your text!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Upload"
          name="previewPicture"
          valuePropName="fileList"
          getValueFromEvent={e => e && e.fileList}
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            name="previewPicture"
            listType="picture-card"
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            onChange={handleFileChange}
          >
            {file ? null : (
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

export default PostModal;