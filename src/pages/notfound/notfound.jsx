import "./notfound.css";
import Alert from "@mui/material/Alert";

export default function notfound() {
  return (
    <div className="notfound">
      <Alert variant="outlined" severity="error">
        The page was not found!
      </Alert>
    </div>
  );
}
