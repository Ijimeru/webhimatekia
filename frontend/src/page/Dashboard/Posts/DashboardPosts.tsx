import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../../utils/useAxios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { MdOutlinePublish } from "react-icons/md";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FaRegEdit } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Modal from "@mui/material/Modal";
import { useAppDispatch } from "../../../Store";
import { fetchPosts } from "../../../slicer/DashboardPostSlicer";

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
const DashboardPosts = () => {
  const dispatch = useAppDispatch();
  interface PostsType {
    id: number;
    title: string;
    author: string;
    publisher: string;
    content: string;
    status: string;
    actions: React.ReactElement | null;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", minWidth: 130, width: 320 },
    { field: "author", headerName: "Author", minWidth: 130 },
    { field: "publisher", headerName: "Publisher", minWidth: 130 },
    { field: "content", headerName: "Content", minWidth: 130, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value == "draft") {
          return (
            <div className="flex flex-row gap-x-2 items-center justify-between">
              <span className="capitalize inline-block">{params.value}</span>
              <MdOutlinePublish
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(81,35,232)] overflow-visible cursor-pointer"
                title="Publish to public"
                onClick={() => handleModal(params.id, () => publish)}
              />
            </div>
          );
        } else if (params.value == "published") {
          return (
            <div className="flex flex-row gap-x-2 items-center justify-between">
              <span className="capitalize inline-block">{params.value}</span>
              <MdOutlinePublish
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer rotate-180"
                title="Unpublish"
                onClick={() => handleModal(params.id, () => publish)}
              />
            </div>
          );
        } else {
          return <span className="capitalize">{params.value}</span>;
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      maxWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <div className="flex flex-row gap-x-1">
            <BsTrash
              className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
              onClick={() => handleModal(params.id, () => trashData)}
              title="Masukkan ke kotak sampah"
            />
            <AiOutlineEye
              className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[rgb(13,202,240)] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible"
              onClick={() => navigate(`/posts/${params.id}`)}
              title="View Post"
            />
            <FaRegEdit className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[#ffc107] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible" title="Edit" />
          </div>
        );
      },
    },
  ];
  const publish = (id: string | null | number) => {
    axios.patch(`/posts/${id}/update`, {
      status: "published",
    });
  };
  const [posts, setPosts] = useState<PostsType[] | []>([
    { id: 0, title: "No data available", author: "No data available", publisher: "No data available", content: "No data available", status: "No data available", actions: <AiOutlineEye /> },
  ]);
  const [filteredPosts, setFilteredPosts] = useState<PostsType[] | []>(posts);
  const [categories, setCategories] = useState<{ label: string }[]>([{ label: "No data available" }]);
  const axios = useAxios();
  const navigate = useNavigate();
  useEffect(() => {
    // fetchData();
    dispatch(fetchPosts());
  }, []);

  const handleModal = (id: number | string, func: (id: string | number | null) => void) => {
    setOpen((prev) => !prev);
    setId(id);
    setCommand(func);
  };
  const handleAccept = (id: number | string | null, func: (id: number | string | null) => void) => {
    func(id);
  };
  const trashData = async (id: number | string | null) => {
    axios.delete(`/posts/${id}/delete`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        command: "trash",
      },
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
  };
  async function fetchData() {
    try {
      const posts = await axios.get("/posts/");
      const categories = await axios.get("/categories/");
      const data = posts.data.map((maps: PostsType) => {
        return {
          ...maps,
          actions: maps.id,
        };
      });
      setPosts(data);
      console.log(data);
      setFilteredPosts(data.filter((d: PostsType) => d.status != "trash"));
      setCategories(
        categories.data.map((map: { name: string }) => {
          return { label: map.name };
        })
      );
    } catch (e) {
      setPosts;
    }
  }
  const [command, setCommand] = useState<(id: number | string | null) => void>(() => {});
  const [id, setId] = useState<number | string | null>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className={`m-[10px_20px_0_16px] h-auto min-h-[100%] relative text-[#3c434a] text-[13px] leading-[1.4em] min-w-[600px] `}>
      <Modal open={open} onClose={() => setOpen((prev) => !prev)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style.box}>
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
              onClick={() => handleAccept(id, command)}
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
      <div className="flex justify-between">
        <div>
          <div className="flex flex-row items-center">
            <h2 className="text-2xl inline-block mr-[5px]">Posts</h2>
            <Link to="/posts/create">
              <span className="border border-[#cc62ce] inline-block p-[4px_8px] text-[#cc62ce] font-semibold rounded-sm">Add New</span>
            </Link>
          </div>
          <div className="flex flex-row gap-x-3">
            <span className="text-blue-700 cursor-pointer" onClick={() => setFilteredPosts(posts.filter((post) => post.status != "trash"))}>
              All ({posts.filter((post) => post.status != "trash").length})
            </span>
            |
            <span className="text-blue-700 cursor-pointer" onClick={() => setFilteredPosts(posts.filter((post) => post.status == "published"))}>
              Published (
              {
                posts?.filter((post) => {
                  return post.status == "published";
                }).length
              }
              )
            </span>
          </div>
        </div>
        <div>
          <div>
            <input
              type="text"
              className="border border-[#cc62ce] p-[4px_8px] font-semibold rounded-sm focus-within:shadow-[0_0_0_2px_#fff,0_0_0_4px_##cc62ce] focus:outline-[#cc62ce] mr-1"
              tabIndex={1}
              onChange={(e) =>
                setFilteredPosts(
                  posts.filter((post) => {
                    return post.title.toLowerCase().includes(e.target.value.toLowerCase());
                  })
                )
              }
            />
            <span className="border border-[#cc62ce] inline-block p-[4px_8px] text-[#cc62ce] font-semibold rounded-sm cursor-pointer  select-none hover:text-[#8f4983c9]" tabIndex={1}>
              Search Posts
            </span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <Autocomplete options={categories!} disablePortal disableCloseOnSelect renderInput={(params) => <TextField {...params} label="Categories" />} />
      </div>
      <div className="mt-3">
        <DataGrid
          rows={filteredPosts!}
          columns={columns}
          pageSizeOptions={[100, 50, 25, 10, 5]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          checkboxSelection
          sx={{ maxHeight: "500px", "&.MuiDataGrid-cell": { maxWidth: "100%" } }}
        />
      </div>
      <div className="mt-3 w-96 border border-[#cc62ce] p-3 rounded-lg">
        <h3 className="font-semibold text-lg">Keterangan :</h3>
        <ul className="flex flex-col gap-y-2 mt-4">
          <li className="flex flex-row gap-x-3 items-center">
            <BsTrash className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible" />:<span>Delete</span>
          </li>
          <li className="flex flex-row gap-x-3 items-center">
            <AiOutlineEye className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[rgb(13,202,240)] hover:text-[rgb(0,0,0)]  overflow-visible" />:<span>View</span>
          </li>
          <li className="flex flex-row gap-x-3 items-center">
            <FaRegEdit className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[#ffc107] hover:text-[rgb(0,0,0)]  overflow-visible" />:<span>Edit</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPosts;
