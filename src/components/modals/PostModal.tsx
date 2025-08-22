import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Upload,
  type FormProps,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  SET_ALL_AUTHORS_TO_SELECT,
  SET_ALL_TAGS_TO_SELECT,
} from "../../store/constants";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/reducers";
import type { UploadChangeParam } from "antd/es/upload";
import type { DetailPost } from "../../types/posts";
import { editPostRequest, createPostRequest } from "../../store/actions/post";
import { setValidationError } from "../../store/actions";

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
  post?: DetailPost;
}

const PostModal = ({ isOpened, setOpen, post }: IPostModal) => {
  const dispatch = useDispatch();
  const allTags = useSelector((state: RootState) => state.content.allTags);
  const allAuthors = useSelector(
    (state: RootState) => state.content.allAuthors
  );
  const validationErrors = useSelector(
    (state: RootState) => state.error.validationErrors
  );
  const [form] = Form.useForm();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const tagOptions = useMemo(
    () =>
      allTags?.map((item) => ({
        label: item.name,
        value: item.id,
        key: item.id,
      })) || [],
    [allTags]
  );

  const authorOptions = useMemo(
    () =>
      allAuthors?.map((item) => ({
        label: item.name,
        value: item.id,
        key: item.id,
      })) || [],
    [allAuthors]
  );

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const formData = new FormData();

    formData.append("code", values.code);
    formData.append("title", values.title);
    formData.append("authorId", values.authorId.toString());
    values.tagIds &&
      values.tagIds.forEach((id) => formData.append("tagIds[]", id.toString()));
    formData.append("text", values.text);
    if (file) {
      formData.append("previewPicture", file);
    }

    post
      ? dispatch(editPostRequest(post.id, formData))
      : dispatch(createPostRequest(formData));
  };

  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      return validationErrors?.find((error) => error.field === fieldName)
        ?.message;
    },
    [validationErrors]
  );

  const handleFileChange = useCallback((info: UploadChangeParam) => {
    const file = info.file.originFileObj;
    if (file) {
      setFile(file);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    form.submit();
  }, []);

  const handleCancel = useCallback(() => {
    setOpen();
    form.resetFields();
    setFile(null);
    setImageUrl(null);
    dispatch(setValidationError(null));
  }, []);

  useEffect(() => {
    if (isOpened) {
      dispatch({ type: SET_ALL_TAGS_TO_SELECT });
      dispatch({ type: SET_ALL_AUTHORS_TO_SELECT });
    }
  }, [isOpened]);

  useEffect(() => {
    if (post && isOpened) {
      form.setFieldsValue({
        code: post.code,
        title: post.title,
        authorId: post.author?.id,
        tagIds: post.tags?.map((tag) => tag.id) || [],
        text: post.text,
      });

      if (post.previewPicture.url) {
        setImageUrl(post.previewPicture.url);
      }
    } else {
      form.resetFields();
      setFile(null);
      setImageUrl(null);
    }
  }, [post, isOpened, form]);

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
      title={post ? "Редактировать пост" : "Создать пост"}
      onCancel={handleCancel}
      footer={[
        <Button onClick={handleCancel} key="back">
          Отмена
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} labelCol={{ span: 4 }} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="Code"
          name="code"
          rules={[{ required: true, message: "Please input your code!" }]}
          help={getFieldError("code")}
          validateStatus={getFieldError("code") ? "error" : ""}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
          help={getFieldError("title")}
          validateStatus={getFieldError("title") ? "error" : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="AuthorId"
          name="authorId"
          rules={[{ required: true, message: "Please input your authorId!" }]}
          help={getFieldError("authorId")}
          validateStatus={getFieldError("authorId") ? "error" : ""}
        >
          <Select options={authorOptions} />
        </Form.Item>
        <Form.Item<FieldType>
          label="TagIds"
          name="tagIds"
          help={getFieldError("tagIds")}
          validateStatus={getFieldError("tagIds") ? "error" : ""}
        >
          <Select mode="multiple" options={tagOptions} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Text"
          name="text"
          rules={[{ required: true, message: "Please input your text!" }]}
          help={getFieldError("text")}
          validateStatus={getFieldError("text") ? "error" : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Upload"
          name="previewPicture"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[
            {
              required: post ? false : true,
              message: "Please upload an image!",
            },
          ]}
          help={getFieldError("previewPicture")}
          validateStatus={getFieldError("previewPicture") ? "error" : ""}
        >
          <Upload
            name="previewPicture"
            listType="picture-card"
            showUploadList={false}
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            onChange={handleFileChange}
          >
            {imageUrl && !file ? (
              <img src={imageUrl} alt="Preview" className="prewiewAvatar" />
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
  );
};

export default PostModal;
