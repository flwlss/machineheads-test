import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import { Button, Card, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import CardButtons from "../components/CardButtons";
import TagModal from "../components/modals/TagModal";
import { deleteTagRequest, setDetailTagRequest } from "../store/actions/tag";
import type { ModalState } from "./PostsPage";
import NotFoundMessage from "../components/NotFoundMessage";

const TagsPage = () => {
  const dispatch = useDispatch();
  const allTags = useSelector((state: RootState) => state.content.allTags);
  const detailTag = useSelector((state: RootState) => state.content.detailTag);
  const [modalState, setModalState] = useState<ModalState>({
    create: false,
    edit: false,
    delete: false,
  });
  const [tagForDeleteId, setTagForDeleteId] = useState<number | null>(null);
  const [tagForEditId, setTagForEditId] = useState<number | null>(null);

  const handleOpenModal = useCallback((modal: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  }, []);

  const handleEdit = useCallback((id: number) => {
    setTagForEditId(id);
    handleOpenModal("edit");
  }, []);

  const handleDelete = useCallback(() => {
    if (tagForDeleteId) {
      dispatch(deleteTagRequest(tagForDeleteId));
    }
    handleOpenModal("delete");
  }, [tagForDeleteId]);

  const handleDeleteClick = useCallback((id: number) => {
    setTagForDeleteId(id);
    handleOpenModal("delete");
  }, []);

  useEffect(() => {
    if (tagForEditId) {
      dispatch(setDetailTagRequest(tagForEditId));
    }
  }, [tagForEditId]);

  return (
    <PageContainer>
      <>
        {modalState.create && (
          <TagModal
            isOpened={modalState.create}
            setOpen={() => handleOpenModal("create")}
          />
        )}
        {detailTag && modalState.edit && (
          <TagModal
            tag={detailTag}
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
          Создать тег
        </Button>
        <div className="content">
          {allTags ? (
            allTags.map((item) => {
              return (
                <Card key={item.id} size="small" style={{ width: 230 }}>
                  <Meta title={item.name} description={item.code} />
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

export default TagsPage;
