import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Copyright from "./Copylight";
import ProTip from "./ProTips";

function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        liff.getProfile()
          .then((profile:any) => {
            setName(profile.displayName);
          })
      })
  }, []);
  
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box component="section" sx={{ width: '100%',borderRadius: 3, border: '1px dashed grey' }}> 
          {name && <p>こんにちは、{name}さん</p>}
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

export default App;