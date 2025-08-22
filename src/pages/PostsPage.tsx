import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import Meta from "antd/es/card/Meta";
import { Button, Card, Modal } from "antd";
import NotFoundMessage from "../components/NotFoundMessage";
import { PAGE_CHANGE } from "../store/constants";
import PostModal from "../components/modals/PostModal";
import { useCallback, useEffect, useState } from "react";
import { setDetailPostRequest, deletePostRequest } from "../store/actions/post";
import CardButtons from "../components/CardButtons";

export interface ModalState {
  create: boolean;
  edit: boolean;
  delete: boolean;
}

const PostsPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: RootState) => state.content.allPosts);
  const pagination = useSelector((state: RootState) => state.common.pagination);
  const detailPost = useSelector(
    (state: RootState) => state.content.detailPost
  );
  const [modalState, setModalState] = useState<ModalState>({
    create: false,
    edit: false,
    delete: false,
  });
  const [postForDeleteId, setPostForDeleteId] = useState<number | null>(null);
  const [postForEditId, setPostForEditId] = useState<number | null>(null);

  const handlePageChange = useCallback((page: number) => {
    dispatch({ type: PAGE_CHANGE, payload: { page } });
  }, []);

  const handleOpenModal = useCallback((modal: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [modal]: !prev[modal] }));
  }, []);

  const handleEdit = useCallback((id: number) => {
    setPostForEditId(id);
    handleOpenModal("edit");
  }, []);

  const handleDelete = useCallback(() => {
    if (postForDeleteId) {
      dispatch(deletePostRequest(postForDeleteId));
    }
    handleOpenModal("delete");
  }, [postForDeleteId]);

  const handleDeleteClick = useCallback((id: number) => {
    setPostForDeleteId(id);
    handleOpenModal("delete");
  }, []);

  useEffect(() => {
    if (postForEditId) {
      dispatch(setDetailPostRequest(postForEditId));
    }
  }, [postForEditId]);

  return (
    <PageContainer pagination={pagination} handlePageChange={handlePageChange}>
      <>
        {modalState.create && (
          <PostModal
            isOpened={modalState.create}
            setOpen={() => handleOpenModal("create")}
          />
        )}
        {detailPost && modalState.edit && (
          <PostModal
            post={detailPost}
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
          Создать пост
        </Button>
        <div className="content">
          {allPosts ? (
            allPosts.map((item) => {
              return (
                <Card
                  key={item.id}
                  hoverable
                  style={{ width: 230 }}
                  styles={{ cover: { margin: 0 } }}
                  cover={<img src={item.previewPicture.url} alt="example" />}
                >
                  <Meta
                    title={item.title}
                    description={`Автор: ${item.authorName ?? "-"}`}
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

export default PostsPage;
