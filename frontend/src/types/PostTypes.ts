export interface PostsType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  content: string;
  status: string;
  actions: React.ReactElement | null;
  slug: string;
}
