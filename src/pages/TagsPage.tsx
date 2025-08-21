import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import { Button, Card, Modal } from "antd";
import { useEffect, useState } from "react";
import Meta from "antd/es/card/Meta";
import CardButtons from "../components/CardButtons";
import TagModal from "../components/modals/TagModal";
import { deleteTagRequest, setDetailTagRequest } from "../store/actions/tag";

const TagsPage = () => {
  const dispatch = useDispatch();
  const allTags = useSelector((state: RootState) => state.content.allTags || []);
  const detailTag = useSelector((state: RootState) => state.content.detailTag);
  const [isOpenedCreateModal, setIsOpenedCreateModal] = useState(false);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const [isOpenedDeleteModal, setIsOpenedDeleteModal] = useState(false);
  const [tagForDeleteId, setTagForDeleteId] = useState<number | null>(null);
  const [tagForEditId, setTagForEditId] = useState<number | null>(null);

  useEffect(() => {
    if (tagForEditId) {
      dispatch(setDetailTagRequest(tagForEditId))
    }
  }, [tagForEditId])

  return (
    <PageContainer>
      <>
        <TagModal
          isOpened={isOpenedCreateModal}
          setOpen={() => { setIsOpenedCreateModal(prev => !prev) }} />
        {detailTag && <TagModal
          tag={detailTag}
          isOpened={isOpenedEditModal}
          setOpen={() => {
            setIsOpenedEditModal(prev => !prev)
            setTagForEditId(null)
          }} />}
        <Modal
          title="Удалить тег?"
          open={isOpenedDeleteModal}
          onOk={() => {
            tagForDeleteId && dispatch(deleteTagRequest(tagForDeleteId));
            setIsOpenedDeleteModal(prev => !prev)
          }}
          onCancel={() => { setIsOpenedDeleteModal(prev => !prev) }} />
        <Button style={{ marginBottom: 20 }}
          onClick={() => {
            setIsOpenedCreateModal(prev => !prev)
          }}
        >Создать тег</Button>
        <div className="content">
          {allTags?.map((item) => {
            return (
              <Card key={item.id} size="small" style={{ width: 230 }}>
                <Meta title={item.name} description={item.code} />
                <CardButtons
                  setIsOpenedEditModal={() => setIsOpenedEditModal(prev => !prev)}
                  setItemForEditId={() => setTagForEditId(item.id)}
                  setIsOpenedDeleteModal={() => setIsOpenedDeleteModal(prev => !prev)}
                  setItemForDeleteId={() => setTagForDeleteId(item.id)}
                />
              </Card>
            )
          })}
        </div>
      </>
    </PageContainer>
  )
}

export default TagsPage;