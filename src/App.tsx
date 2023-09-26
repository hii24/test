import React, { useState, useEffect } from "react";
import axios from "axios";

const CLIENT_ID = '1205582848933137'
const CLIENT_SECRET = '3657eb161045ee2385959c0f7a882c99'
function App() {
  const [code, setCode] = useState<string>('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeFromUrl = params.get("code");

    if (codeFromUrl) {
      setCode(codeFromUrl);
    }
  }, []);

  const handlePostClick = async () => {
    if (code) {
      try {
        const data = {
          grant_type: "authorization_code",
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: "https://t11est.kyiv.ua/",
          code: code,
        };

        const response = await axios.post(
          "https://app.asana.com/-/oauth_token",
          data
        );

        const tokenData = response.data;
        console.log("Токен Asana:", tokenData);
      } catch (error) {
        console.error(
          error
        );
      }
    } 
  };

  return (
    <>
    <h1>Test</h1>
      {code ? (
        <>
          <p>code: {code}</p>
          <button onClick={handlePostClick}>POST</button>
        </>
      ) : (
        <a
          href={`https://app.asana.com/-/oauth_authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=https%3A%2F%2Ft11est.kyiv.ua%2F`}
        >
          Authenticate with Asana
        </a>
      )}
    </>
  );
}

export default App;
