import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import Meta from "antd/es/card/Meta";
import { Button, Card, Modal } from "antd";
import NotFoundMessage from "../components/NotFoundMessage";
import { PAGE_CHANGE } from "../store/constants";
import PostModal from "../components/modals/PostModal";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { setDetailPostRequest, deletePostRequest } from "../store/actions/post";

const PostsPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: RootState) => state.content.allPosts);
  const pagination = useSelector((state: RootState) => state.pagination);
  const detailPost = useSelector((state: RootState) => state.content.detailPost)
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
  const [postForDeleteId, setPostForDeleteId] = useState<number | null>(null);
  const [postForEditId, setPostForEditId] = useState<number | null>(null);

  const handlePageChange = (page: number) => {
    dispatch({ type: PAGE_CHANGE, payload: { page } });
  };

  useEffect(() => {
    if (postForEditId) {
      dispatch(setDetailPostRequest(postForEditId))
    }
  }, [postForEditId])

  return (
    <PageContainer
      pagination={pagination}
      handlePageChange={handlePageChange}>
      <>
        <PostModal
          isOpened={isOpenedCreateModal}
          setOpen={() => { setIsOpenedCreateModal(prev => !prev) }} />
        {detailPost && <PostModal
          post={detailPost}
          isOpened={isOpenedEditModal}
          setOpen={() => {
            setIsOpenedEditModal(prev => !prev)
            setPostForEditId(null)
          }} />}
        <Modal
          title="Удалить пост?"
          open={isOpenedDeleteModal}
          onOk={() => {
            postForDeleteId && dispatch(deletePostRequest(postForDeleteId));
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
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button icon={<EditOutlined />}
                    onClick={() => {
                      setIsOpenedEditModal(prev => !prev)
                      setPostForEditId(item.id)
                    }} />
                  <Button
                    onClick={() => {
                      setIsOpenedDeleteModal(prev => !prev)
                      setPostForDeleteId(item.id)
                    }} danger>Удалить</Button>
                </div>
              </Card>
            )
          }) : <NotFoundMessage />}
        </div>
      </>
    </PageContainer>
  )
}

export default PostsPage