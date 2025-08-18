import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout'
import { useHistory } from 'react-router-dom';
import { PATHS } from '../navigation/paths';

const HeaderNav = () => {
  const navigate = useHistory()

  const items = [
    { key: PATHS.POSTS, label: 'Posts', onClick: () => navigate.push(PATHS.POSTS) },
    { key: PATHS.AUTHORS, label: 'Authors', onClick: () => navigate.push(PATHS.AUTHORS) },
    { key: PATHS.TAGS, label: 'Tags', onClick: () => navigate.push(PATHS.TAGS) },
  ];

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Header>
  )
}

export default HeaderNav