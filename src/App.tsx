import React, { useState, useEffect } from "react";
import axios from "axios";

const CLIENT_ID = "1205582848933137";
const CLIENT_SECRET = "3657eb161045ee2385959c0f7a882c99";
function App() {
  const [code, setCode] = useState<string>("");
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
       
        const form = new FormData();
        form.append("grant_type", "authorization_code");
        form.append("client_id", CLIENT_ID);
        form.append("client_secret", CLIENT_SECRET);
        form.append("redirect_uri", "https://test-j9qxlun94-serhiis-projects-1f8fabb1.vercel.app/");
        form.append("code", code);

        const response = await axios.post(
          "https://app.asana.com/-/oauth_token",
          form
        );

        const tokenData = response.data;
        console.log("Токен Asana:", tokenData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <h1>Test 2</h1>
      {code ? (
        <>
          <p>code: {code}</p>
          <button onClick={handlePostClick}>POST</button>
        </>
      ) : (
        <a
          href={`https://app.asana.com/-/oauth_authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=https://test-j9qxlun94-serhiis-projects-1f8fabb1.vercel.app/`}
        >
          Authenticate with Asana
        </a>
      )}
    </>
  );
}

export default App;
