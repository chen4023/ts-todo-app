import { useState } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");

  // 할일 추가 함수
  const addTodo = (text: string) => {
    if (text.trim() === "") {
      alert(`텍스트를 입력해 주세요.`);
      return;
    }
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  // 할일 상태 변경 함수
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할일 삭제 함수
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>📆 TodoList</h1>
      <div>
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 추가하세요."
        />
        <button className="add_btn" onClick={() => addTodo(input)}>
          추가하기
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <div className="todo">
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
            </li>
            <button className="delete_btn" onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
