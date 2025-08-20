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

export type DetailAuthor = {
  id: number,
  name: string,
  lastName: string,
  secondName: string,
  shortDescription: string,
  description: string,
  avatar: {
    id: number,
    name: string,
    url: string
  },
  updatedAt: string,
  createdAt: string
}