import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import { Button, Card, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import NotFoundMessage from "../components/NotFoundMessage";
import { useEffect, useState } from "react";
import AuthorModal from "../components/modals/AuthorModal";
import { deleteAuthorRequest, setDetailAuthorRequest } from "../store/actions/author";
import CardButtons from "../components/CardButtons";

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const allAuthors = useSelector((state: RootState) => state.content.allAuthors);
  const detailAuthor = useSelector((state: RootState) => state.content.detailAuthor)
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
  const [authorForDeleteId, setAuthorForDeleteId] = useState<number | null>(null);
  const [authorForEditId, setAuthorForEditId] = useState<number | null>(null);

  useEffect(() => {
    if (authorForEditId) {
      dispatch(setDetailAuthorRequest(authorForEditId))
    }
  }, [authorForEditId])

  return (
    <PageContainer>
      <>
        {isOpenedCreateModal && <AuthorModal
          isOpened={isOpenedCreateModal}
          setOpen={() => { setIsOpenedCreateModal(prev => !prev) }} />}
        {detailAuthor && isOpenedEditModal && <AuthorModal
          author={detailAuthor}
          isOpened={isOpenedEditModal}
          setOpen={() => { setIsOpenedEditModal(prev => !prev) }} />}
        <Modal
          title="Удалить автора?"
          open={isOpenedDeleteModal}
          onOk={() => {
            authorForDeleteId && dispatch(deleteAuthorRequest(authorForDeleteId));
            setIsOpenedDeleteModal(prev => !prev)
          }}
          onCancel={() => { setIsOpenedDeleteModal(prev => !prev) }} />
        <Button style={{ marginBottom: 20 }}
          onClick={() => {
            setIsOpenedCreateModal(prev => !prev)
          }}
        >Добавить автора</Button>
        <div className="content">
          {allAuthors ? allAuthors.map((item) => {
            return (
              <Card
                key={item.id}
                hoverable
                style={{ width: 230 }}
                styles={{ cover: { margin: 0 } }}
                cover={<img src={item?.avatar?.url ?? 'noImage.jpeg'} alt="example" />}
              >
                <Meta title={item.name} description={new Date(item.createdAt).toLocaleString()} />
                <CardButtons
                  setIsOpenedEditModal={() => setIsOpenedEditModal(prev => !prev)}
                  setItemForEditId={() => setAuthorForEditId(item.id)}
                  setIsOpenedDeleteModal={() => setIsOpenedDeleteModal(prev => !prev)}
                  setItemForDeleteId={() => setAuthorForDeleteId(item.id)}
                />
              </Card>
            )
          }) : <NotFoundMessage />}
        </div>
      </>
    </PageContainer>
  )
}

export default AuthorsPage;