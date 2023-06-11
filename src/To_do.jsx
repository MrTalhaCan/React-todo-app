import { useEffect, useState } from "react";
import "./todo.css";
import { Container } from './Container';
const triggerText = 'Add Todo';
export default function Todo(){
    const [selectedTodo, setSelectedTodo]   =   useState(JSON.parse(localStorage.getItem("todo")) || []);
    const [addTodo, setAddTodo] = useState(() => JSON.parse(localStorage.getItem("todo")) || []);
    const onSubmit = (event) => {
        event.preventDefault(event);
        var todoList  =   [];
        if(document.querySelector('.todo-list')){
            document.querySelectorAll('.todo-list').forEach((todo, index) => {
                if(todo.value.trim() != ""){
                    todoList[index] = {"value": todo.value, "isActive": true, "isDone" : false}
                }
            })
            console.log(todoList)
        }
        if(todoList.length > 0){
            setAddTodo(prev => [...prev, {"id" : Math.floor(Math.random() * 100), "date": event.target.tarih.value, "todo" : todoList}])
        }
        console.log(addTodo)
      };      
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(addTodo))
    }, [addTodo])

    function clickHandle(e, id){
        setSelectedTodo(id)
        addActiveCls(e);
    }
    function myTodo(todo) {
        return todo.id === selectedTodo;
    }
    function addActiveCls(e){
        document.querySelectorAll("nav ul li").forEach((element => element.classList.remove("active")))
        e.target.classList.add("active");
    }
    function toggleTodo(e, index, id){
        setAddTodo(prev => {
            e.preventDefault();
            var todo    =   prev.filter((todos) => todos.id === id);
            todo[0].todo[index].isDone    =   !(todo[0].todo[index].isDone);
            return [...prev];
        })
    }
    function doInActive(index, id){
        setAddTodo(prev => {
            var todo    =   prev.filter((todos) => todos.id === id);
            todo[0].todo[index].isActive    =   false;
            return [...prev];
        })
    }
    function delTodo(id){
        setAddTodo(prev => {
            var todo    =   prev.filter((todos) => todos.id !== id);
            return [...todo];
        })
    }
    return(
        <>
            <nav>
                <ul>
                    {addTodo.map((item, i) => <div className="liFrame" key={i}><li key={i} onClick={(e) => clickHandle(e, item.id)}>{item.date}</li><span className="del-navItem" onClick={() => delTodo(item.id)}></span></div>)}
                    <li><div className="App"><Container triggerText={triggerText} onSubmit={onSubmit} /></div></li>
                </ul>
            </nav>
            
            <section>
                {addTodo.filter(myTodo).map((todos, i) => (<div className="todoFrame" key={i}><h2>{todos.date}</h2><ul>{todos.todo.map((todo,index) => {return (todo.isActive && <div key={index} onClick={(e) => toggleTodo(e, index, todos.id)}><li key={index}>{(todo.isDone) ? <s>{todo.value}</s> : todo.value}</li>
                <button onClick={() => doInActive(index, todos.id)} type='button'>del</button></div>)})}</ul></div>))}              
            </section>
        </>
    )
}