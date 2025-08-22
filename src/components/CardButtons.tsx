import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface ICardButtons {
  onEdit: () => void;
  onDelete: () => void;
}

const CardButtons = ({ onEdit, onDelete }: ICardButtons) => {
  return (
    <div className="cardButtons">
      <Button icon={<EditOutlined />} onClick={onEdit} />
      <Button onClick={onDelete} danger>
        Удалить
      </Button>
    </div>
  );
};

export default CardButtons;
