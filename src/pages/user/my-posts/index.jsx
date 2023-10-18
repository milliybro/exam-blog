import { Fragment, useCallback, useEffect, useState } from "react";

import "./style.scss";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input, Modal, Select, Upload } from "antd";
import request from "../../../server";
import { IMG } from "../../../const";

const MyPostsPage = () => {
  const [category, setCategory] = useState(null);
  const [photoId, setPhotoId] = useState(null);
  const [categories, setCategories] = useState(null);
  const [sortedCategories, setSortedCategories] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const UserPost = useCallback( async () => {
    try {
      let { data } = await request.get("post/user");
      setUserPost(data?.data);
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    UserPost();
  }, [UserPost]);



  useEffect(() => {
    let options;
    options = categories?.map((category) => {
      return {
        value: category?._id,
        label: category?.name,
      };
    });
    setSortedCategories(options);

    
    UserPost();
  }, [categories, UserPost]);
  
  const getCategories = async () => {
    try {
      let { data } = await request.get("category");
      setCategories(data?.data);
    } catch (err) {
      toast.error(err);
    }

  };

  useEffect(()=>{
    getCategories()
  }, [])
  const handleOk = async () => {
    try {
      let values = await form.validateFields();
      let res = await request.post("post", {
        ...values,
        photo: photoId,
      });
      console.log(res);
    } catch (err) {
      toast.error(err.response.data);
    }
    setIsModalOpen(false);
  };

  const showModal = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    console.log(value);
    setCategory(value);
  };

  const uploadPhoto = async (e) => {
    let form = new FormData();
    form.append("photo", e.file.originFileObj);
    console.log(res);
    let res = await request.post("upload", form);
    setPhotoId(res?.data.split(".")[0].split("_")[1]);
  };

  return (
    <Fragment>
      <section id="my-posts">
        <div className="container my-posts">
          <div className="my-posts__header">
            <h1 className="my-posts__title">All posts</h1>
            <button onClick={showModal} className="add-post-btn">
              Add post
            </button>
          </div>
          <input
            name="search"
            placeholder="Searching..."
            className="search-input"
            type="text"
          />
          <div className="line"></div>
          <div className="posts-row">
            {userPost?.map((post) => (
              <div key={post?._id} className="post-card">
                <Link
                  title="Click the image to read more"
                  to={`/blog-post/${post?._id}`}
                  className="post-image"
                >
                  <img
                    src={`${IMG + post?.photo?._id}.${
                      post?.photo?.name.split(".")[1]
                    }`}
                    alt=""
                  />
                </Link>
                <div className="post-info">
                  <p className="post-subtitle">{post?.category.name}</p>
                  <h3 className="post-title">{post?.title}</h3>
                  <p className="post-desc">{post?.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Modal
            title="Create your post"
            open={isModalOpen}
            onOk={handleOk}
            okText="Add post"
            onCancel={handleCancel}
          >
            <Form
              id="post-form"
              name="Post"
              form={form}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                maxWidth: 700,
              }}
              autoComplete="off"
            >
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Select
                  value={category}
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  options={sortedCategories}
                />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please fill!",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item label="Image*" name="photo">
                <Upload
                  name="avatarcha"
                  className="avatar-uploader"
                  showUploadList={false}
                  onChange={uploadPhoto}
                >
                </Upload>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </section>
    </Fragment>
  );
};

export default MyPostsPage;
