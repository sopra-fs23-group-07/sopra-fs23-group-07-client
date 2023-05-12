import { Button, styled } from "@mui/material";

export const MyButton = styled(Button)(({ theme }) => ({

  '&.active': {
    color: theme.palette.secondary.main,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:focus': {
    backgroundColor: theme.palette.secondary.main,
  }, 
  background: "red",
}));
