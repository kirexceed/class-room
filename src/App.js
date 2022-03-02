import React, { useEffect, useState } from "react";
import "./App.css";
import { getTables, getUsers } from "./api";

function App() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const loadData = () => {
    setLoading(true)
    Promise.all([getTables, getUsers]).then(([tables, users]) => {
      setTables(
        tables.map((table) => {
          return {
            ...table,
            users: users.filter((user) => user.object_id === table.id),
          };
        })
      );
    }).catch(er => {
      setError(er.message)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(async () => {
    loadData()
  }, []);

  console.log(tables);
  if (error) return <span>Error: {error}</span>
  return (
    <div className="mainContainer">
      {loading ? <div className="loading">загрузочка</div> : tables &&
        tables.map((table) => {
          const divStyle = {
            position: "absolute",
            left: table.left,
            top: table.top,
            transform: `rotate(${table.angle}deg)`,
            border: "1px solid grey",
          };

          return (
            <div key={table.id} className={table.type} style={divStyle}>
              {!!table.users.length && table.users.map((user) => (
                <img key={user.id} src={user.avatar} />
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default App;
