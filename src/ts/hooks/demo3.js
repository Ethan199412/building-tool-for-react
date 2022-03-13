import React, { useEffect, useState } from "react";
// import useRequest from "./useRequest";

function useRequest(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();

    const loadData = async () => {
        setIsLoading(true);
        try {
            let response = await fetch(url);
            let data = await response.json();
            setData(data);
        } catch (e) {
            setError(e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('[p0] mount url', url)
        loadData();
    }, []);

    return [data, isLoading, error];
}

function Demo3() {
    const [posts, isPostsLoading] = useRequest(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
    );
    const [todos, isTodosLoading] = useRequest(
        "https://jsonplaceholder.typicode.com/todos?_limit=5"
    );
    console.log('render')
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

export default Demo3