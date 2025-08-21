import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"

interface ICardButtons {
  setIsOpenedEditModal: () => void;
  setItemForEditId: () => void;
  setIsOpenedDeleteModal: () => void;
  setItemForDeleteId: () => void;
}

const CardButtons = ({
  setIsOpenedEditModal,
  setItemForEditId,
  setIsOpenedDeleteModal,
  setItemForDeleteId }: ICardButtons) => {
  return (
    <div className="cardButtons">
      <Button icon={<EditOutlined />}
        onClick={() => {
          setIsOpenedEditModal()
          setItemForEditId()
        }} />
      <Button
        onClick={() => {
          setIsOpenedDeleteModal()
          setItemForDeleteId()
        }} danger>Удалить</Button>
    </div>
  )
}

export default CardButtons;