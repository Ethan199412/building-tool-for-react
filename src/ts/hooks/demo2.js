import React, { useEffect, useState } from "react";

function Demo2() {
  const [posts, setPosts] = useState([]);
  const [isPostsLoading, setIsPostsLoading] = useState();
  const [todos, setTodos] = useState([]);
  const [isTodosLoading, setIsTodosLoading] = useState();

  useEffect(() => {
    const loadPosts = async () => {
      setIsPostsLoading(true);
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );
        let data = await response.json();
        setPosts(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsPostsLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const loadTodos = async () => {
      setIsTodosLoading(true);
      try {
        let response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        let data = await response.json();
        setTodos(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsTodosLoading(false);
      }
    };
    loadTodos();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {isPostsLoading ? (
          <div>loading...</div>
        ) : (
          posts.map(post => <li key={post.id}>{post.title}</li>)
        )}
      </ul>
      <h1>Todos</h1>
      <ul>
        {isTodosLoading ? (
          <div>loading...</div>
        ) : (
          todos.map(todo => <li key={todo.id}>{todo.title}</li>)
        )}
      </ul>
    </div>
  );
}

export default Demo2;