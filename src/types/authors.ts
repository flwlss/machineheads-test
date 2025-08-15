export type Author = {
  id: number,
  name: string,
  lastName: string,
  secondName: string,
  avatar: {
    id: number,
    name: string,
    url: string
  },
  updatedAt: string,
  createdAt: string
}