import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";
import Meta from "antd/es/card/Meta";
import { Card } from "antd";
import NotFoundMessage from "../components/NotFoundMessage";
import { PAGE_CHANGE } from "../store/constants";

const PostsPage = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state: RootState) => state.content.allPosts);
  const pagination = useSelector((state: RootState) => state.pagination);

  const handlePageChange = (page: number) => {
    dispatch({ type: PAGE_CHANGE, payload: { page } });
  };

  return (
    <PageContainer pagination={pagination} handlePageChange={handlePageChange}>
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
            </Card>
          )
        }) : <NotFoundMessage />}
      </div>
    </PageContainer>
  )
}

export default PostsPage