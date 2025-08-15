import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";

const TagsPage = () => {
  const allTags = useSelector((state: RootState) => state.content.allTags || []);

  return (
    <PageContainer>
      <>
        {allTags?.map((item) => {
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

export default TagsPage;