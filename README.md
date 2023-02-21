# wanted-pre-onboarding-frontend

이 레파지토리는 원티드 프리온보딩 프론트엔드 과정 선발 과제를 위해 만들어졌습니다.


## Available Scripts

In the project directory, you can run:

### `yarn install`

then

### `yarn start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Demo Link
Open [https://kysclient.github.io/wanted-pre-onboarding-frontend](https://kysclient.github.io/wanted-pre-onboarding-frontend) to view it in the browser.

## Assignment

### 사용 라이브러리

```
react-router-dom
axios
chakra-ui
```

## &#10004; Auth
```js
src/common/utils/axios.js

const axiosConfig: AxiosRequestConfig = {
    baseURL: baseURL,
    timeout: 180000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    }
}

export const client = axios.create(axiosConfig);

client.interceptors.request.use((config) => {
    if (!config.headers) return config;

    let token: string | null = localStorage.getItem('ACCESS_TOKEN');
    if(token !== null){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
```

## &#10004; APIs

```js
src/apis/todo-api

export function fetchTodos() {
    return client.get("/todos")
}

export function createTodo(todo: TodoDto) {
    return client.post("/todos", todo)
}

export function updateTodo(todoId: number, updateTodo: UpdateTodoDto) {
    return client.put(`/todos/${todoId}`, updateTodo)
}

export function deleteTodo(todoId: number) {
    return client.delete(`/todos/${todoId}`)
}
```
<hr/>

```js
src/apis/todo-api

export function signUp(userInfo: UserDto) {
    return client.post("/auth/signup", userInfo)
}

export function signIn(userInfo: UserDto) {
return client.post("/auth/signin", userInfo)
}
```

## &#10004; Custom Hook
```js
src/hooks/useTodos.ts

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true)
        const loadTodos = async () => {
            fetchTodos()
                .then(response => {
                    setTodos([...response.data])
                })
                .catch(e => {
                    setError(e)
                })
        };
        loadTodos()
        setLoading(false)
    }, [])

    return {todos, setTodos, loading, error}
}
```

## &#10004; Validation
```js
src/common/utils/regex.ts

export const emailRegex = (email: string) : boolean => {
    return emailExpression.test(email);
}

export const passwordRegex = (password: string) : boolean => {
    return password.length >= 8
}

const emailExpression: RegExp = /@/;

```
## &#10004; SOC:Separation of Concerns (관심사 분리)
```js
src/components/TodoList/connectTodos.tsx

export function ConnectTodos() {
    const {todos, setTodos} = useTodos();
    const [error, setError] = useState('');

    const handleCreateTodo = async (todoText: string) => {
        createTodo({todo: todoText})
            .then(response => {
                setTodos([response.data, ...todos])
                setError('')
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }

    const handleDeleteTodo = async (todoId: number) => {
        deleteTodo(todoId)
            .then(response => {
                setTodos(todos.filter(todo => todo.id !== todoId))
                setError('')
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }

    const handleUpdate = async (todoId: number, todo: UpdateTodoDto) => {
        updateTodo(todoId, todo)
            .then(response => {
                setTodos([response.data, ...todos.filter(todo => todo.id !== todoId)])
                setError('')
            })
            .catch(e => {
                setError(e.response.data.message)
            })
    }


    return (
        <Default pageName={"ToDo List"}>
            <Wrapper>
                <VStack minW={'500'}>
                    {error && <ErrorMessage message={error}/>}
                    <Heading
                        p='5'
                        fontWeight='extrabold'
                        size='xl'
                        bgGradient='linear(to-l, teal.300, blue.500)'
                        bgClip='text'
                    >
                        JUST DO IT.
                    </Heading>
                    <AddTodo addTodo={handleCreateTodo}/>
                    <Todos createTodo={handleCreateTodo} deleteTodo={handleDeleteTodo} updateTodo={handleUpdate}
                           todos={todos}/>
                </VStack>
            </Wrapper>
        </Default>
    )
}

```



