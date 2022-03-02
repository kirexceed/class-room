import React, { useEffect, useState } from "react";
import "./App.css";
import { getTables, getUsers } from "./api";

function App() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(async () => {
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
    })
  }, []);

  console.log(tables);
  if (error) return <span>Error: {error}</span>
  return (
    <div className="mainContainer">
      {tables &&
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
              {table.users.map((user) => (
                <img key={user.id} src={user.avatar} />
              ))}
            </div>
          );
        })}
    </div>
  );
}

export default App;
