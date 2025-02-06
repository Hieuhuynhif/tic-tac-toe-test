import { Close, LensBlur, PanoramaFishEye } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type Props = {
  value?: "X" | "O";
  onClick: () => void;
};

function StyledButton({ value, onClick }: Props) {
  if (value === "X")
    return (
      <IconButton onClick={onClick} color="primary" size="large">
        <Close />
      </IconButton>
    );

  if (value == "O")
    return (
      <IconButton onClick={onClick} color="warning" size="large">
        <PanoramaFishEye />
      </IconButton>
    );

  return (
    <IconButton onClick={onClick} size="large">
      <LensBlur />
    </IconButton>
  );
}

export default StyledButton;
