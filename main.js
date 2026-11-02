const { error } = require("node:console");

//1
async function getUser(userId) {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()).then(data => {
        console.log(data.name)
        return data
    });
}
// getUser(2)

//2
async function getPost(postId) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => res.json()).then(data => {
        console.log(data.title)
        return data
    })
}
// getPost(3)

//3
async function getUserEmail(userId) {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(res => res.json()).then(data => console.log(data.email));
}
// getUserEmail(2)

//4
async function listUserTodos(userId) {
    await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(res => res.json()).then(data => {
        console.log(`user: ${userId} has ${data.length} todos`)
        return data
    })
}
listUserTodos(3)
//5
async function checkPostExists(postId) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(res => {
        if (!res.ok) {
            throw new Error("Post not found");
        }
        return res.json();
    })
        .then(() => console.log("post exists"))
        .catch(() => console.log("not exist"));
}
// checkPostExists(4)

//6
async function fetchWithDelay(url, delay) {
    return new Promise(resolve => setTimeout(resolve, delay))
        .then(() => fetch(url))
        .then(res => res.text())
        .then(text => {
            console.log("First 50 chars:", text.slice(0, 50) + "...");
        })
}
// fetchWithDelay('https://jsonplaceholder.typicode.com/posts/1', 2000);

//7
async function showKeys(url) {
    const res = await fetch(url).then(x => x.json()).then(data => console.log(Object.keys(data)))
}
// showKeys("https://jsonplaceholder.typicode.com/posts/1")

//8
async function getUserFirstPost(userId) {
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(data => console.log(`User: ${data.name}`))
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0)
                console.log(`First post title: ${data[0].title}`);
            else
                console.log("No posts found for this user.");
        })
        .catch(error => console.log("Error fetching data:", error)
        )
}
getUserFirstPost(5)
//9
async function getPostCommentsCount(postId) {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(res => res.json());
    await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then(res => res.json())
        .then(comments => {
            console.log(`Post has ${comments.length} comments`);
        })
        .catch(error => console.log("Error fetching data:", error))
}
getPostCommentsCount(1);
//10
async function todoAndUser(todoId) {
    let userId;
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
        .then(res => res.json())
        .then(todo => {
            console.log(`Todo title: ${todo.title}`);
            userId = todo.userId;
        });
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(res => res.json())
        .then(user => {
            console.log(`User name: ${user.name}`);
        }).catch(error => console.log("Error fetching data:", error))
}
todoAndUser(1);