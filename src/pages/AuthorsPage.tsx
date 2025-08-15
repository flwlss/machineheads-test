import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import NotFoundMessage from "../components/NotFoundMessage";

const AuthorsPage = () => {
  const allAuthors = useSelector((state: RootState) => state.content.allAuthors);

  return (
    <PageContainer>
      <div className="authors">
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
            </Card>
          )
        }) : <NotFoundMessage />}
      </div>
    </PageContainer>
  )
}

export default AuthorsPage;