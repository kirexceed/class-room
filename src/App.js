import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css'

function App() {
  const [tables, setTables] = useState([])
  const [users, setUsers] = useState([])

  const userByTables = tables.map((table)=> {
    return {
      table,
      users: users.filter(user => user.object_id === table.id)
    }
  })
    
  useEffect(async () => {
    Promise.all([])

    await axios
      .get("http://goodsok.ru/mock-api/objects.php")
      .then((res) => {
        setTables(res.data)
      });
    await axios
    .get("http://goodsok.ru/mock-api/users.php")
    .then((res) => {
      setUsers(res.data)
    });
  }, []);
  
  return (
    <div className='mainContainer'>
      {userByTables.map(({table, users}) => {
        const divStyle = {
          position: 'absolute',
          left: table.left,
          top: table.top,
          transform: `rotate(${table.angle}deg)`,
          border: '1px solid grey'
        }

        return <div key={table.id} className={table.type} style={divStyle}>
          {users.map(user => <img key={user.id} src={user.avatar} />)}
        </div>
      })}
    </div>
  );
}

export default App;
