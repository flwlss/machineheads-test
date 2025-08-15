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