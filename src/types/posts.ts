export type Post = {
  id: number,
  title: string,
  code: string,
  authorName: string,
  previewPicture: {
    id: number,
    name: string,
    url: string
  },
  tagNames: string[],
  updatedAt: string,
  createdAt: string
}

export type DetailPost = {
  id: number,
  title: string,
  code: string,
  text: string,
  previewPicture: {
    id: number,
    name: string,
    url: string
  },
  author: {
    id: number,
    fullName: string,
    avatar: {
      id: number,
      name: string,
      url: string
    }
  },
  tags: [
    {
      id: number,
      name: string,
      code: string
    }
  ],
  updatedAt: string,
  createdAt: string
}