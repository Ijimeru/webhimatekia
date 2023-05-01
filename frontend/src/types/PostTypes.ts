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

export interface CategoryType {
  label: string;
}
export interface DashboardPostContextType {
  posts: PostsType[] | null;
  setPosts: React.Dispatch<React.SetStateAction<DashboardPostContextType["posts"]>>;
  categories: CategoryType[] | null;
  setCategories: React.Dispatch<React.SetStateAction<DashboardPostContextType["categories"]>>;
  filteredPosts: DashboardPostContextType["posts"];
  setFilteredPosts: React.Dispatch<React.SetStateAction<DashboardPostContextType["posts"]>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  trashData(slug: string): void;
  fetchData(): Promise<void>;
  publishData(slug: string): void;
  unPublishData(slug: string): void;
  recycleData(slug: string): void;
}

export interface ConstantType {
  text: string;
  btext: string;
  color: string;
}
