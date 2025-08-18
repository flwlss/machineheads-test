import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import Meta from "antd/es/card/Meta";
import { Button, Card, Modal } from "antd";
import NotFoundMessage from "../components/NotFoundMessage";
import { PAGE_CHANGE } from "../store/constants";
import PostModal from "../components/modals/PostModal";
import { useState } from "react";
import { deletePostRequest } from "../store/actions";

const PostsPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: RootState) => state.content.allPosts);
  const pagination = useSelector((state: RootState) => state.pagination);
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
  const [postForDelete, setPostForDelete] = useState<number | null>(null);

  const handlePageChange = (page: number) => {
    dispatch({ type: PAGE_CHANGE, payload: { page } });
  };

  return (
    <PageContainer
      pagination={pagination}
      handlePageChange={handlePageChange}>
      <>
        <PostModal
          isOpened={isOpenedCreateModal}
          setOpen={() => { setIsOpenedCreateModal(prev => !prev) }} />
        <Modal
          title="Удалить пост?"
          open={isOpenedDeleteModal}
          onOk={() => {
            postForDelete && dispatch(deletePostRequest(postForDelete));
            setIsOpenedDeleteModal(prev => !prev)
          }}
          onCancel={() => { setIsOpenedDeleteModal(prev => !prev) }} />
        <Button style={{ marginBottom: 20 }}
          onClick={() => {
            setIsOpenedCreateModal(prev => !prev)
          }}
        >Создать пост</Button>
        <div className="content">
          {allPosts ? allPosts.map((item) => {
            return (
              <Card
                key={item.id}
                hoverable
                style={{ width: 230 }}
                styles={{ cover: { margin: 0 } }}
                cover={<img src={item.previewPicture.url} alt="example" />}
              >
                <Meta title={item.title} description={`Автор: ${item.authorName ?? '-'}`} />
                <Button onClick={() => {
                  setIsOpenedDeleteModal(prev => !prev)
                  setPostForDelete(item.id)
                }} danger>Удалить</Button>
              </Card>
            )
          }) : <NotFoundMessage />}
        </div>
      </>
    </PageContainer>
  )
}

export default PostsPage