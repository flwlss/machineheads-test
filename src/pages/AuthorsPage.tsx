import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import { Button, Card, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import NotFoundMessage from "../components/NotFoundMessage";
import { useCallback, useEffect, useState } from "react";
import AuthorModal from "../components/modals/AuthorModal";
import {
  deleteAuthorRequest,
  setDetailAuthorRequest,
} from "../store/actions/author";
import CardButtons from "../components/CardButtons";
import type { ModalState } from "./PostsPage";

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const allAuthors = useSelector(
    (state: RootState) => state.content.allAuthors
  );
  const detailAuthor = useSelector(
    (state: RootState) => state.content.detailAuthor
  );
  const [modalState, setModalState] = useState<ModalState>({
    create: false,
    edit: false,
    delete: false,
  });
  const [authorForDeleteId, setAuthorForDeleteId] = useState<number | null>(
    null
  );
  const [authorForEditId, setAuthorForEditId] = useState<number | null>(null);

  const handleOpenModal = useCallback((modal: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  }, []);

  const handleEdit = useCallback((id: number) => {
    setAuthorForEditId(id);
    handleOpenModal("edit");
  }, []);

  const handleDelete = useCallback(() => {
    if (authorForDeleteId) {
      dispatch(deleteAuthorRequest(authorForDeleteId));
    }
    handleOpenModal("delete");
  }, [authorForDeleteId]);

  const handleDeleteClick = useCallback((id: number) => {
    setAuthorForDeleteId(id);
    handleOpenModal("delete");
  }, []);

  useEffect(() => {
    if (authorForEditId) {
      dispatch(setDetailAuthorRequest(authorForEditId));
    }
  }, [authorForEditId]);

  return (
    <PageContainer>
      <>
        {modalState.create && (
          <AuthorModal
            isOpened={modalState.create}
            setOpen={() => handleOpenModal("create")}
          />
        )}
        {detailAuthor && modalState.edit && (
          <AuthorModal
            author={detailAuthor}
            isOpened={modalState.edit}
            setOpen={() => handleOpenModal("edit")}
          />
        )}
        <Modal
          title="Удалить пост?"
          open={modalState.delete}
          onOk={handleDelete}
          onCancel={() => handleOpenModal("delete")}
        />
        <Button
          style={{ marginBottom: 20 }}
          onClick={() => handleOpenModal("create")}
        >
          Создать автора
        </Button>
        <div className="content">
          {allAuthors ? (
            allAuthors.map((item) => {
              return (
                <Card
                  key={item.id}
                  hoverable
                  style={{ width: 230 }}
                  styles={{ cover: { margin: 0 } }}
                  cover={
                    <img
                      src={item?.avatar?.url ?? "noImage.jpeg"}
                      alt="example"
                    />
                  }
                >
                  <Meta
                    title={item.name}
                    description={new Date(item.createdAt).toLocaleString()}
                  />
                  <CardButtons
                    onEdit={() => handleEdit(item.id)}
                    onDelete={() => handleDeleteClick(item.id)}
                  />
                </Card>
              );
            })
          ) : (
            <NotFoundMessage />
          )}
        </div>
      </>
    </PageContainer>
  );
};

export default AuthorsPage;
