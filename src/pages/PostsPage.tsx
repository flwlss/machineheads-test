import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";

const PostsPage = () => {
  const allPosts = useSelector((state: RootState) => state.content.allPosts || []);

  return (
    <PageContainer>
      <>
        {allPosts?.map((item) => {
          return (
            <div key={item.id}>
              {item.id}
            </div>
          )
        })}
      </>
    </PageContainer>
  )
}

export default PostsPage