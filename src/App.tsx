import React, { useState, useEffect } from "react";
import axios from "axios";

const CLIENT_ID = "1205582848933137";
const CLIENT_SECRET = "3657eb161045ee2385959c0f7a882c99";
const DOMEN_URL = "https://t11est.kyiv.ua/";
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
        const response = await axios.get(
          `https://www.goodday.work/api/integration/asana/token?code=${code}`
        );
        const responseTwo = await axios.get(
          `https://www.goodday.work/api/app/ping`
        );
        console.log(responseTwo, "responseTwo");
        const tokenData = response.data;
        console.log("Токен Asana:", tokenData);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleGetClick = async () => {
    try {
      const response = await axios.get(`https://www.goodday.work/api/app/ping`);

      console.log("get response:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Test 2</h1>
      {code ? (
        <>
          <p>code: {code}</p>
          <button onClick={handlePostClick}>GET</button>
        </>
      ) : (
        <a
        href={`https://app.asana.com/-/oauth_authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${DOMEN_URL}`}
        >
          Authenticate with Asana
        </a>
      )}
      <button onClick={handleGetClick}>OK</button>
    </>
  );
}

export default App;
