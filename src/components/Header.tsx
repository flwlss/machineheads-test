import { Header } from "antd/es/layout/layout";
import { Link, useLocation } from "react-router-dom";
import { PATHS } from "../navigation/paths";
import { Typography } from "antd";

const HeaderNav = () => {
  const { pathname } = useLocation();

  const items = [
    { key: 1, label: "Posts", path: PATHS.POSTS },
    { key: 2, label: "Authors", path: PATHS.AUTHORS },
    { key: 3, label: "Tags", path: PATHS.TAGS },
  ];

  return (
    <Header>
      <nav>
        {items.map((item) => {
          return (
            <Link key={item.key} to={item.path}>
              <Typography.Text
                className={item.path === pathname ? "navActive" : "navInactive"}
              >
                {item.label}
              </Typography.Text>
            </Link>
          );
        })}
      </nav>
    </Header>
  );
};

export default HeaderNav;
