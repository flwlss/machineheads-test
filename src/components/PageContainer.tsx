import { Pagination } from "antd";
import HeaderNav from "./Header"
import type { PaginationMeta } from "../api";

interface IPageContainer {
  children: React.ReactElement;
  pagination?: PaginationMeta;
  handlePageChange?: (page: number) => void;
}

const PageContainer = ({ children, pagination, handlePageChange }: IPageContainer) => {
  return (
    <>
      <HeaderNav />
      <main className="container">
        {children}
        {pagination && <Pagination
          current={pagination.currentPage}
          total={pagination.totalCount}
          pageSize={pagination.perPage}
          onChange={handlePageChange}
          showSizeChanger={false}
          style={{ marginTop: 30 }}
        />}
      </main>
    </>
  )
}

export default PageContainer;