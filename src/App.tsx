import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Copyright from "./Copylight";
import ProTip from "./ProTips";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        liff.getProfile()
          .then((profile:any) => {
            setName(profile.displayName);
            setImage(profile.pictureUrl);
          })
      })
  }, []);
  
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Grid container direction="row">
          <Grid size={4} p={2}>
            <img src={image && {image}} className="App-logo" alt="Profile-img"/>
          </Grid>
          <Grid  size={8}  compontent="section" sx={{alignItems: "center"} }>
            <Stack spacing={2} sx={{width: "150px", margin: "10px auto"}}>
              <Button variant="outlined" size="small">get Id Token</Button>
              <Button variant="outlined" size="small">send Message</Button>
              <Button variant="outlined" size="small">share Target Picker</Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
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