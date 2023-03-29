import { Button,styled } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const ButtonTest = ()=>{

    const GeneralButton = styled(Button)({
        backgroundColor:"pink",
        color:"red",
        margin:"10",
        "&:hover":{
            backgroundColor:"black",
            color:"white"
        }
    });

    return (
      <>
        <Button color="secondary">
          Hello 
        </Button>
        <Button variant="contained" color="success">
          <SettingsIcon/>Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
        <GeneralButton>General</GeneralButton>
      </>
    );
}

export default ButtonTest;




