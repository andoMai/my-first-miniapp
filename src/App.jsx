import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        liff.getProfile()
          .then((profile) => {
            setName(profile.displayName);
          })
      })
  }, []);
  
  return (
    <div className="App">
      <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI Preact example
          {name && <p>こんにちは、{name}さん</p>}
        </Typography>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  </div>
  );
}

export default App;