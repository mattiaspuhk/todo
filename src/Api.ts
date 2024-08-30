import axios from "axios";

export interface Task {
    id: number,
    attributes: {
        createdAt: Date,
        done: boolean,
        publishedAt: Date,
        title: string,
        updatedAt: Date,
    }
}

export async function getTasks(token): Promise<Task[]> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const fetchedTasks = []
            const request = await axios.get("http://localhost:1337/api/todos", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            request.data.data.forEach(task => {
                fetchedTasks.push({
                    id: task.id,
                    attributes: {
                        createdAt: new Date(task.attributes.createdAt),
                        done: task.attributes.done,
                        publishedAt: new Date(task.attributes.publishedAt),
                        title: task.attributes.title,
                        updatedAt: new Date(task.attributes.updatedAt)
                    }
                })
            })

            return fetchedTasks
        } catch(e) {
            console.log(e)
        }
}

export async function deleteTask(id, token) {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        await axios.delete(`http://localhost:1337/api/todos/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    } catch(e) {
        console.log(e)
    }
}

export async function createTask(task: {title: string, done: boolean}, token) : Promise<Task> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const request = await axios.post("http://localhost:1337/api/todos", {data: task}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return request.data.data
    } catch(e) {
        console.log(e)
    }
}

export async function updateTask(id, task, token) : Promise<Task> {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    try {
        const request = await axios.put(`http://localhost:1337/api/todos/${id}`, {data: task}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        return request.data.data
    } catch(e) {
        console.log(e)
    }
}

export async function registerAccount(data: {username: string, email: string, password: string}) {
    try {
        const request = await axios.post(`http://localhost:1337/api/auth/local/register`, data)

        return request.data
    } catch(e) {
        console.log(e)
    }
}

export async function loginAccount(data: {identifier: string, password: string}) {
    try {
        const request = await axios.post(`http://localhost:1337/api/auth/local`, data)

        return request.data
    } catch(e) {
        console.log(e)
    }
}