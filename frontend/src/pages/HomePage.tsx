import Button from "@mui/material/Button"
import { Header } from "../components/Header"
import { styled } from "@mui/material";
import { pxToRem } from "../components/utils";
import { useNavigate } from "react-router-dom";

const StyledDiv = styled('div')(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: pxToRem(16),
  gap: pxToRem(16),
  width: pxToRem(400),
  height: pxToRem(600),
  margin : "auto",
}));

export const HomePage = () => {

  const navigate = useNavigate(); 

    return <>
     <Header/>

     <StyledDiv>
        <Button variant="contained" onClick={() => navigate("/charts")}>
          View Chart
        </Button>
        <Button variant="contained" onClick={() => navigate("/create-chart")}>
          Create Chart
        </Button>
     </StyledDiv>
    </>
}