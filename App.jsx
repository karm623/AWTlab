import { useState } from "react";

function App() {

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    { username: "prof", password: "123", role: "Professor" },
    { username: "student", password: "123", role: "Student" }
  ];

  const handleLogin = () => {

    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Invalid Credentials");
    }
  };

  const logout = () => {
    setUser(null);
    setUsername("");
    setPassword("");
  };


  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button onClick={handleLogin}>Login</button>

        <p>
          Try:<br/>
          prof / 123 → Professor<br/>
          student / 123 → Student
        </p>
      </div>
    );
  }


  if (user.role === "Professor") {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Professor Dashboard </h1>
        <p>Welcome {user.username}</p>

        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Student Dashboard </h1>
      <p>Welcome {user.username}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
