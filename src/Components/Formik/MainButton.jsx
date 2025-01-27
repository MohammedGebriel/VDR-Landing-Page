/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { Spinner } from "../../atoms/UI/Spinner";

export default function MainButton({ text, className, type , loading , action }) {
  return (
    <div>
      <Button
        fullWidth
        size="large"
        type={type}
        variant="contained"
        sx={{ mb: 7 }}
        className={`${className} bg-contained`}
        onClick={action}
      >
        
        {loading ? <Spinner/> : text}
      </Button>
    </div>
  );
}
