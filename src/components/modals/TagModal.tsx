import { Button, Form, Input, Modal, type FormProps } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/reducers";
import type { Tag } from "../../types/tags";
import { createTagRequest, editTagRequest } from "../../store/actions/tag";
import { setValidationError } from "../../store/actions";
import { SUCCESS_REQUEST } from "../../store/constants";

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
  const validationErrors = useSelector(
    (state: RootState) => state.error.validationErrors
  );
  const successRequest = useSelector(
    (state: RootState) => state.common.successRequest
  );
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const formData = new FormData();

    formData.append("code", values.code);
    formData.append("name", values.name);
    values.sort && formData.append("sort", values.sort.toString());

    tag
      ? dispatch(editTagRequest(tag.id, formData))
      : dispatch(createTagRequest(formData));
  };

  const getFieldError = useCallback(
    (fieldName: string): string | undefined => {
      return validationErrors?.find((error) => error.field === fieldName)
        ?.message;
    },
    [validationErrors]
  );

  const handleSubmit = useCallback(() => {
    form.submit();
  }, [form]);

  const handleCancel = useCallback(() => {
    setOpen();
    form.resetFields();
    dispatch(setValidationError(null));
  }, [setOpen, form]);

  useEffect(() => {
    if (tag && isOpened) {
      form.setFieldsValue({
        code: tag.code,
        name: tag.name,
        sort: tag.sort,
      });
    } else {
      form.resetFields();
    }
  }, [tag, isOpened, form]);

  useEffect(() => {
    if (successRequest) {
      handleCancel();
      dispatch({ type: SUCCESS_REQUEST, payload: false });
    }
  }, [successRequest]);

  return (
    <Modal
      open={isOpened}
      title={tag ? "Редактировать тег" : "Создать тег"}
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
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
          help={getFieldError("name")}
          validateStatus={getFieldError("name") ? "error" : ""}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Sort"
          name="sort"
          help={getFieldError("sort")}
          validateStatus={getFieldError("sort") ? "error" : ""}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TagModal;
