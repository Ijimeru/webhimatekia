import React, { FormEvent } from "react";
import CheckboxesTags from "../../../components/AutoComplete/CheckboxesTags";
import useAxios from "../../../hook/useAxios";
import { CheckBoxProp } from "../../../types/PostTypes";
import { AuthContext } from "../../../context/AuthContext";

const DashboardNewPost = () => {
  const axios = useAxios();
  const [option, setOption] = React.useState<CheckBoxProp["options"]>([]);
  const [selectedOptions, setSelectedOptions] = React.useState<CheckBoxProp["options"]>([]);
  const { user } = React.useContext(AuthContext);
  React.useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const response = await axios.get("/categories/");
    const data = await response.data;
    const categories = data.map((d: { name: string }) => ({ label: d.name }));
    setOption(categories);
  };
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      content: { value: string };
      hero: HTMLInputElement;
    };
    const title = target.title.value;
    const categories = selectedOptions.map((opt) => opt.label);
    const content = target.content.value;
    const hero_img = target.hero.files![0];
    axios.post(
      "/posts/creates",
      {
        title,
        categories,
        content,
        hero_img,
        status: "published",
        author: user?.user_id,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
  return (
    <div className="mt-5 max-w-3xl">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <h2 className="text-center text-3xl font-semibold">Create New Posts</h2>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" className="w-full self-center" />
        <label htmlFor="hero-img">Hero Image</label>
        <input type="file" name="hero" id="hero-img" />
        <label htmlFor="content">Content</label>
        <textarea name="content" id="content"></textarea>
        <label htmlFor="category">Category</label>
        <CheckboxesTags options={option!} setSelectedOptions={setSelectedOptions} />
        <button type="submit">Gege</button>
      </form>
    </div>
  );
};

export default DashboardNewPost;
