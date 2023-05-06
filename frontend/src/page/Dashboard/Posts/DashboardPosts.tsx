import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { BsRecycle, BsTrash, BsSearch } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlinePublish, MdDeleteForever } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import DashboardModal from "../../../components/Modal/DashboardModal";
import { BUANG, DELETE, PUBLISH, RECYCLE, UNPUBLISH } from "../../../constant/DashboardPostsConstant";
import DashboardPostContext from "../../../context/DashboardPostContext";
import { ConstantType } from "../../../types/PostTypes";

const DashboardPosts = () => {
  //INI KOLOM TABEL YAK
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
              <MdOutlinePublish
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(81,35,232)] overflow-visible cursor-pointer"
                title="Publish to public"
                onClick={() => handleModal(params.row.slug, () => publishData, PUBLISH)}
              />
              <span className="capitalize inline-block">{params.value}</span>
            </div>
          );
        } else if (params.value == "published") {
          return (
            <div className="flex flex-row gap-x-2 items-center justify-between">
              <MdOutlinePublish
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer rotate-180"
                title="Unpublish"
                onClick={() => handleModal(params.row.slug, () => unPublishData, UNPUBLISH)}
              />
              <span className="capitalize inline-block">{params.value}</span>
            </div>
          );
        } else if (params.value == "trash") {
          return (
            <div className="flex flex-row gap-x-2 items-center justify-between">
              <BsRecycle
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(14,192,67)] overflow-visible cursor-pointer rotate-180"
                title="Make to draft"
                onClick={() => handleModal(params.row.slug, () => recycleData, RECYCLE)}
              />
              <span className="capitalize inline-block">{params.value}</span>
            </div>
          );
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
            {params.row.status == "trash" ? (
              <MdDeleteForever
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
                onClick={() => handleModal(params.row.slug, () => deleteData, DELETE)}
                title="Delete Permanen"
              />
            ) : (
              <BsTrash
                className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible cursor-pointer"
                onClick={() => handleModal(params.row.slug, () => trashData, BUANG)}
                title="Masukkan ke kotak sampah"
              />
            )}
            <AiOutlineEye
              className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[rgb(13,202,240)] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible"
              onClick={() => navigate(`/dashboard/posts/${params.row.slug}`)}
              title="View Post"
            />
            <FaRegEdit className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[#ffc107] hover:text-[rgb(0,0,0)] cursor-pointer overflow-visible" title="Edit" />
          </div>
        );
      },
    },
  ];
  //INI UTILITY
  const queryParameters = new URLSearchParams(window.location.search);
  const status = queryParameters.get("status");
  const search = queryParameters.get("search");

  //INI CONTEXT
  const { categories, posts, filteredPosts, setFilteredPosts, setOpen, fetchData, trashData, publishData, unPublishData, recycleData, deleteData } = useContext(DashboardPostContext);

  //INI HOOK
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authTokens")) {
      fetchData();
    }
  }, []);
  const [command, setCommand] = useState<(slug: string) => void>(() => {});
  const [type, setType] = useState<ConstantType>(BUANG);
  const [slug, setSlug] = useState<string>("");

  const handleModal = (slug: string, func: (slug: string) => void, type: ConstantType) => {
    setOpen((prev) => !prev);
    setSlug(slug);
    setType(type);
    setCommand(func);
  };

  return (
    <main>
      <DashboardModal type={type!} slug={slug} command={command} />

      <div className="flex justify-between">
        <div>
          <div className="flex flex-row items-center">
            <h2 className="text-2xl inline-block mr-[5px]">Posts</h2>
            <Link to="/dashboard/posts/create">
              <span className="border border-[#cc62ce] inline-block p-[4px_8px] text-[#cc62ce] font-semibold rounded-sm">Add New</span>
            </Link>
          </div>
          <div className="flex flex-row gap-x-3">
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => {
                search
                  ? setFilteredPosts(
                      posts!.filter((post) => {
                        return post.title.toLowerCase().includes(search.toLowerCase());
                      })
                    )
                  : setFilteredPosts(posts);
                search ? navigate(`/dashboard/posts/?search=${search}`) : navigate("/dashboard/posts/");
              }}
            >
              All ({search ? posts!.filter((post) => post.title.toLowerCase().includes(search)).length : posts!.length})
            </span>
            |
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => {
                search ? setFilteredPosts(posts!.filter((post) => post.status == "draft" && post.title.toLowerCase().includes(search.toLowerCase()))) : setFilteredPosts(posts!.filter((post) => post.status == "draft"));
                search ? navigate(`/dashboard/posts/?status=draft&search=${search}`) : navigate("/dashboard/posts/?status=draft");
              }}
            >
              Draft (
              {search
                ? posts?.filter((post) => post.status == "draft" && post.title.toLowerCase().includes(search.toLowerCase())).length
                : posts?.filter((post) => {
                    return post.status == "draft";
                  }).length}
              )
            </span>
            |
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => {
                search ? setFilteredPosts(posts!.filter((post) => post.status == "published" && post.title.toLowerCase().includes(search.toLowerCase()))) : setFilteredPosts(posts!.filter((post) => post.status == "published"));
                search ? navigate(`/dashboard/posts/?status=published&search=${search}`) : navigate("/dashboard/posts/?status=published");
              }}
            >
              Published (
              {search
                ? posts?.filter((post) => post.status == "published" && post.title.toLowerCase().includes(search.toLowerCase())).length
                : posts?.filter((post) => {
                    return post.status == "published";
                  }).length}
              )
            </span>
            |
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => {
                search ? setFilteredPosts(posts!.filter((post) => post.status == "trash" && post.title.toLowerCase().includes(search.toLowerCase()))) : setFilteredPosts(posts!.filter((post) => post.status == "trash"));
                search ? navigate(`/dashboard/posts/?status=trash&search=${search}`) : navigate("/dashboard/posts/?status=trash");
              }}
            >
              Trash (
              {search
                ? posts?.filter((post) => post.status == "trash" && post.title.toLowerCase().includes(search.toLowerCase())).length
                : posts?.filter((post) => {
                    return post.status == "trash";
                  }).length}
              )
            </span>
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              type="text"
              className="border border-[#cc62ce] p-[4px_8px_4px_28px] font-semibold rounded-xl focus-within:shadow-[0_0_0_2px_#fff,0_0_0_4px_##cc62ce] focus:outline-[#cc62ce] mr-1"
              tabIndex={1}
              placeholder="Cari berdasarkan title..."
              onChange={(e) => {
                setFilteredPosts(
                  posts!.filter((post) => {
                    return post.title.toLowerCase().includes(e.target.value.toLowerCase());
                  })
                );
                status ? navigate(`/dashboard/posts/?search=${e.target.value}&status=${status}`) : navigate("/dashboard/posts/?search=" + e.target.value);
              }}
            />
            <BsSearch className="absolute top-1/2 -translate-y-1/2 left-3" />
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
            <BsTrash className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible" />:<span>Buang</span>
          </li>
          <li className="flex flex-row gap-x-3 items-center">
            <MdDeleteForever className="p-1 rounded-lg text-2xl text-white flex justify-center items-center hover:text-[rgb(0,0,0)] bg-[rgb(220,53,69)] overflow-visible" />:<span>Hapus Permanen</span>
          </li>
          <li className="flex flex-row gap-x-3 items-center">
            <AiOutlineEye className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[rgb(13,202,240)] hover:text-[rgb(0,0,0)]  overflow-visible" />:<span>View</span>
          </li>
          <li className="flex flex-row gap-x-3 items-center">
            <FaRegEdit className="p-1 rounded-lg justify-center items-center text-white text-2xl bg-[#ffc107] hover:text-[rgb(0,0,0)]  overflow-visible" />:<span>Edit</span>
          </li>
        </ul>
      </div>
      <button onClick={() => window.open("http://127.0.0.1:8000/api/category/create", "Popup", "width=400,height=400")}>gege</button>
    </main>
  );
};

export default DashboardPosts;
