
import React, { useState, useEffect } from "react";

type ResourceType = "posts" | "users" | "comments" | "all";

const fetchUsers = async (): Promise<any[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return data;
};

const fetchPosts = async (): Promise<any[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
};

const fetchComments = async (): Promise<any[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await response.json();
  return data;
};

const App: React.FC = () => {
  const [resourceType, setResourceType] = useState<ResourceType>("posts");
  const [items, setItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [allItems, setAllItmes]=useState<any[]>([])
    useEffect(() => {
    async function fetchData() {
      let ids = searchTerm
        .split(" ")
        .filter((id) => id.trim() !== "")
        .map((id) => String(id)); 

      if (resourceType === "posts") {
        const posts = await fetchPosts();
        setAllItmes(posts);
        setItems(posts.filter((post) => ids.includes(post.id.toString())));
      } else if (resourceType === "users") {
        const users = await fetchUsers();
        setAllItmes(users);
        setItems(users.filter((user) => ids.includes(user.id.toString())));
      } else if (resourceType === "comments") {
        const comments = await fetchComments();
        setAllItmes(comments);
        setItems(
          comments.filter((comment) => ids.includes(comment.id.toString()))
        );
      } else {
        const users = await fetchUsers();
        const comments = await fetchComments();
        const posts = await fetchPosts();
        const all = [...users, ...comments, ...posts];
        setItems(all.filter((item) => ids.includes(item.id.toString())));
      }
    }
    fetchData();
  }, [resourceType, searchTerm]);

  return (
    <>
      <div>
        <button onClick={() => setResourceType("posts")}>Posts</button>
        <button onClick={() => setResourceType("users")}>Users</button>
        <button onClick={() => setResourceType("comments")}>Comments</button>
        <button onClick={() => setResourceType("all")}>All</button>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </div>
        <h1>{resourceType}</h1>
        {items.map((item, index) => (
          <div key={index}>
            <pre>{JSON.stringify(item)}</pre>
          </div>
        ))}
      </div>
      <h1>{resourceType}</h1>
      {allItems.map((item) => {
         return <pre key={item.id}>{JSON.stringify(item)}</pre>;
       })}
    </>
  );
};

export default App;
