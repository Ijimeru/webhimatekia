import React, { useReducer } from "react";

import { Button, Typography, Modal, Box } from "@mui/material";
import useAxios from "../../utils/useAxios";

const axios = useAxios();

interface PostsType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  content: string;
  status: string;
  actions: React.ReactElement | null;
}
interface DashboardModalProps {
  text: string;
  btext: string;
  setPosts: React.Dispatch<React.SetStateAction<PostsType[] | null>>;
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostsType[] | null>>;
  open: boolean;
  id: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  posts: PostsType[];
}

const style = {
  box: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid rgb(163,60,170)",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
  },
  button: {
    p: 1,
    backgroundColor: null,
    borderRadius: "16px",
    textTransform: "none",
    color: "white",
  },
};

type Action = { type: "trash" } | { type: "publish" };

type State = { id: number };

const DashboardModal: React.FC<DashboardModalProps> = ({ text, btext, setPosts, setFilteredPosts, open, setOpen, id, posts }) => {
  function reducer(state: State, action: Action): void {
    switch (action.type) {
      case "trash":
        axios.patch(`/posts/${id}/delete`, {
          headers: {
            "Content-Type": "application/json",
          },
          status: "trash",
        });
        setPosts(
          posts.map((post) => {
            if (post.id === id) {
              return { ...post, status: "trash" };
            }
            return post;
          })
        );
        setFilteredPosts(posts.filter((post) => post.id != id && post.status != "trash"));
        setOpen((prev) => !prev);
        break;
      case "publish":
        axios.patch(`/posts/${id}/publish`, {
          headers: {
            "Content-Type": "application/json",
          },
          status: "published",
        });
        setPosts(
          posts.map((post) => {
            if (post.id === id) {
              return { ...post, status: "published" };
            }
            return post;
          })
        );
        setFilteredPosts(posts.filter((post) => post.id != id && post.status != "published"));
        setOpen((prev) => !prev);
        break;
      default:
        break;
    }
  }
  const initialState: State = { id: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Modal open={open} onClose={() => setOpen((prev) => !prev)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style.box}>
        {btext}
        {text}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Apakah anda yakin ingin memasukkan ke kotak sampah?
        </Typography>
        <div className="flex flex-row justify-center gap-x-3">
          <Button
            id="modal-modal-description"
            sx={{
              ...style.button,
              backgroundColor: "#dc3545",
              "&:hover": {
                backgroundColor: "#dc3545",
              },
            }}
            onClick={() => {}}
          >
            Buang
          </Button>
          <Button
            id="modal-modal-cancel"
            sx={{
              ...style.button,
              backgroundColor: "#15d36a",
              "&:hover": {
                backgroundColor: "#15d36a",
              },
            }}
            onClick={() => setOpen((prev) => !prev)}
          >
            Batalkan
          </Button>
        </div>
      </Box>
    </Modal>
  );
};
export default DashboardModal;
