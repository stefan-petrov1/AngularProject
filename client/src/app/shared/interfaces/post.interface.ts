export interface IPost {
  imageUrl: string;
  price: number;
  title: string;
  _createdOn: number;
  _updatedOn?: number;
  _id: string;
  _ownerId: string;
}

export type PostData = Omit<
  IPost,
  '_id' | '_createdOn' | '_updatedOn' | '_ownerId'
>;
