import { useState } from "react";

export default function Api() {

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("http://localhost:3000/user");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  const sendRequest = async (e) => {
    e.preventDefault();

    try {

      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json"
        }
      };

      if (method === "POST" || method === "PUT") {
        options.body = body;
      }

      const res = await fetch(url, options);

      const data = await res.json();

      setResponse(JSON.stringify(data, null, 2));

    } catch (error) {

      setResponse("Error: " + error.message);

    }
  };

  return (
    <form className="api-form" onSubmit={sendRequest}>

      <h1>API Tester</h1>

      <p>Test your API endpoints easily</p>

      <label htmlFor="select">
        Request Type
      </label>

      <select
        id="select"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>


      <label htmlFor="url">
        URL
      </label>

      <input
        type="text"
        id="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="http://localhost:3000/user"
      />


      <label htmlFor="add">
        Request Body
      </label>

      <textarea
        id="add"
        rows="6"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='{"name":"Rahul","age":22}'
      ></textarea>


      <input
        className="submit-btn"
        type="submit"
        value="Send Request"
      />


      <label>
        Response
      </label>

      <pre className="response-box">
        {response}
      </pre>

    </form>
  );
}