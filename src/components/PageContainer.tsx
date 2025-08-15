import HeaderNav from "./Header"

interface IPageContainer {
  children: React.ReactElement;
}

const PageContainer = ({ children }: IPageContainer) => {
  return (
    <>
      <HeaderNav />
      <main>
        {children}
      </main>
    </>
  )
}

export default PageContainer;