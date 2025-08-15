import { useSelector } from "react-redux";
import PageContainer from "../components/PageContainer";
import type { RootState } from "../store/reducers";

const AuthorsPage = () => {
  const allAuthors = useSelector((state: RootState) => state.content.allAuthors || []);

  return (
    <PageContainer>
      <>
        {allAuthors.map((item) => {
          return (
            <div key={item.id}>
              {item?.id}
            </div>
          )
        })}
      </>
    </PageContainer>
  )
}

export default AuthorsPage