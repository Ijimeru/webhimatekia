import React from "react";
import { CategoryType, DashboardPostContextType, PostsType } from "../types/PostTypes";
import useAxios from "../hook/useAxios";
import { toast } from "react-toastify";

export const DashboardPostContext = React.createContext<DashboardPostContextType>({
  posts: null,
  setPosts: () => {},
  categories: null,
  setCategories: () => {},
  filteredPosts: null,
  setFilteredPosts: () => {},
  open: false,
  setOpen: () => {},
  fetchData: async () => {},
  trashData: () => {},
  publishData: () => {},
  unPublishData: () => {},
  recycleData: () => {},
  deleteData: () => {},
});
interface DashboardPostProviderType {
  children: React.ReactNode;
}

export const DashboardPostProvider: React.FC<DashboardPostProviderType> = ({ children }) => {
  // INI HOOK
  const axios = useAxios();
  // INI UTILITY
  const queryParameters = new URLSearchParams(window.location.search);
  const status = queryParameters.get("status");
  const search = queryParameters.get("search");
  // STATE ADA DISINI YA
  const [posts, setPosts] = React.useState<PostsType[] | null>([]);
  const [categories, setCategories] = React.useState<CategoryType[] | null>([]);
  const [filteredPosts, setFilteredPosts] = React.useState<DashboardPostContextType["posts"]>([]);
  const [open, setOpen] = React.useState<boolean>(false);

  // FUNGSI PENGUBAH STATUS POST
  const ubahStatus = (stat: string, statUrl: string, slug: string) => {
    let postsBaru: PostsType[] = stat == "deleted" ? posts!.filter((post) => post.slug !== slug) : posts!.map((post: PostsType) => (post.slug === slug ? { ...post, status: stat } : post));
    setPosts(postsBaru);
    postsBaru = status == statUrl ? postsBaru?.filter((post) => post.slug !== slug && post.status == statUrl) : postsBaru;
    postsBaru = search ? postsBaru.filter((post) => post.title.toLowerCase().includes(search!.toLowerCase())) : postsBaru;
    setFilteredPosts(postsBaru);
  };
  // SEMUA FUNGSI UTILITAS CRUD
  async function fetchData() {
    const posts = await axios.get("/posts/");
    const categories = await axios.get("/categories/");
    const data = posts.data;
    setPosts(data);
    setFilteredPosts(status ? data.filter((d: PostsType) => d.status === status) : data);
    setCategories(
      categories.data.map((map: { name: string }) => {
        return { label: map.name };
      })
    );
  }
  const trashData = (slug: string) => {
    setOpen((prev) => !prev);
    const response = new Promise((resolve, rejected) =>
      axios
        .delete(`/posts/${slug}/delete`, {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            command: "trash",
          },
        })
        .then((res) => {
          console.log(res.status);
          if (res.status == 204) {
            resolve("Data anda berhasil dibuang 👍");
            ubahStatus("trash", "draft", slug);
          } else {
            rejected("Data gagal dibuang 😓");
          }
        })
        .catch(() => rejected("Data gagal dibuang, periksa koneksi anda 🚨"))
    );
    toast.promise(response, {
      pending: {
        render() {
          return "Sedang mempublikasi...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });
  };
  const publishData = (slug: string) => {
    setOpen((prev) => !prev);
    const response = new Promise((resolve, rejected) =>
      axios
        .patch(`/posts/${slug}/update`, {
          status: "published",
        })
        .then((response) => {
          if (response.status == 200) {
            resolve("Publikasi sukses 👍");
            ubahStatus("published", "draft", slug);
          } else {
            rejected("Publikasi gagal 😓");
          }
        })
        .catch(() => rejected("Publikasi gagal, silahkan periksa koneksi anda 🚨"))
    );
    toast.promise(response, {
      pending: {
        render() {
          return "Sedang mempublikasi...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });
  };
  const unPublishData = (slug: string) => {
    setOpen((prev) => !prev);
    const response = new Promise((resolve, rejected) =>
      axios
        .patch(`/posts/${slug}/update`, {
          status: "draft",
        })
        .then((res) => {
          if (res.status == 200) {
            ubahStatus("draft", "published", slug);
            resolve("Publikasi berhasil dibatalkan 👍");
          } else {
            rejected("Perintah gagal 😓");
          }
        })
        .catch(() => rejected("Pembatalan publikasi gagal, silahkan cek koneksi anda 🚨"))
    );

    toast.promise(response, {
      pending: {
        render() {
          return "Sedang membatalkan publikasi...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });
  };
  const recycleData = (slug: string) => {
    setOpen((prev) => !prev);
    const response = new Promise((resolve, rejected) =>
      axios
        .patch(`/posts/${slug}/update`, {
          status: "draft",
        })
        .then((res) => {
          if ((res.status = 200)) {
            ubahStatus("draft", "trash", slug);
            resolve("Post anda berhasil dikembalikan 👍");
          } else {
            rejected("Perintah gagal 😓");
          }
        })
        .catch(() => rejected("Pengembalian post gagal, silahkan cek koneksi anda 🚨"))
    );

    toast.promise(response, {
      pending: {
        render() {
          return "Sedang mengembalikan post...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });
  };
  const deleteData = (slug: string) => {
    setOpen((prev) => !prev);
    const response = new Promise((resolve, rejected) =>
      axios
        .patch(`/posts/${slug}/update`, {
          status: "deleted",
        })
        .then((res) => {
          if ((res.status = 200)) {
            ubahStatus("deleted", "trash", slug);
            resolve("Post anda berhasil dihapus 👍");
          } else {
            rejected("Perintah gagal 😓");
          }
        })
        .catch(() => rejected("Post gagal dihapus, silahkan cek koneksi anda 🚨"))
    );

    toast.promise(response, {
      pending: {
        render() {
          return "Sedang menghapus post...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
      },
      error: {
        render({ data }) {
          return `${data}`;
        },
      },
    });
  };
  return (
    <DashboardPostContext.Provider value={{ posts, setPosts, categories, setCategories, filteredPosts, setFilteredPosts, open, setOpen, trashData, fetchData, publishData, unPublishData, recycleData, deleteData }}>
      {children}
    </DashboardPostContext.Provider>
  );
};

export default DashboardPostContext;
