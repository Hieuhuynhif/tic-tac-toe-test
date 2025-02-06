import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";

import { Close, PanoramaFishEye } from "@mui/icons-material";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import StyledButton from "./components/StyledButton";

function App() {
  const [board, setBoard] = useState<Array<"X" | "O" | undefined>>([]);
  const [isX, setIsX] = useState(true);
  const [isFinish, setIsFinish] = useState<"X" | "O" | "">("");
  const [score, setScore] = useState<{ X: number; O: number }>({
    X: 0,
    O: 0,
  });

  const handleClick = (index: number) => {
    if (!board[index] && !isFinish) {
      setBoard((curBoard) => {
        const newBoard = [...curBoard];
        newBoard[index] = isX ? "X" : "O";
        return newBoard;
      });

      setIsX((curIsX) => !curIsX);
    }

    return;
  };

  const checkWin = useCallback((): void => {
    const winCases = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    for (let index = 0; index < winCases.length; index++) {
      const element = winCases[index];
      const [x, y, z] = element;

      if (board[x] && board[x] === board[y] && board[x] === board[z]) {
        setIsFinish(board[x]);

        const newScore = { ...score };

        switch (board[x]) {
          case "X":
            newScore.X++;
            setScore(newScore);
            break;
          case "O":
            newScore.O++;
            setScore(newScore);
            break;
          default:
            break;
        }
      }
    }
  }, [board, score]);

  const handleResetGame = (): void => {
    setIsFinish("");
    setBoard([]);
  };

  useEffect(() => {
    if (!isFinish) checkWin();
  }, [checkWin, isFinish]);

  return (
    <Stack p={{ xs: "10%", sm: "20%" }} spacing={2} alignItems={"start"}>
      <Box>
        <Typography color="primary" fontWeight={500} fontSize={"3rem"}>
          X --- O
        </Typography>
        <Typography color="primary" fontWeight={500} fontSize={"3rem"}>
          {score.X} --- {score.O}
        </Typography>
        <Typography color="error" fontWeight={500} fontSize={"3rem"}>
          WINNER: {isFinish}
        </Typography>
      </Box>
      <Typography color="textPrimary" variant="caption" fontSize={"2rem"}>
        Next:{" "}
        {isX ? (
          <Close color="primary" sx={{ fontSize: "1rem" }} />
        ) : (
          <PanoramaFishEye color="warning" sx={{ fontSize: "1rem" }} />
        )}
      </Typography>
      <Grid2 container border={"solid 1px #555"} borderRadius={"10px"} p={2}>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[1]} onClick={() => handleClick(1)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[2]} onClick={() => handleClick(2)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[3]} onClick={() => handleClick(3)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[4]} onClick={() => handleClick(4)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[5]} onClick={() => handleClick(5)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[6]} onClick={() => handleClick(6)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[7]} onClick={() => handleClick(7)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[8]} onClick={() => handleClick(8)} />
        </Grid2>
        <Grid2 size={4} p={1}>
          <StyledButton value={board[9]} onClick={() => handleClick(9)} />
        </Grid2>
      </Grid2>

      <Button onClick={handleResetGame}>Reset The Game</Button>
    </Stack>
  );
}

export default App;
