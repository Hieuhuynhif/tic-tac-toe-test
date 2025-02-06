import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";

import { Close, PanoramaFishEye } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import StyledButton from "./components/StyledButton";

function App() {
  const [board, setBoard] = useState<Array<"X" | "O" | undefined>>([]);
  const [isX, setIsX] = useState<boolean | undefined>(undefined);
  const [isFinish, setIsFinish] = useState<"X" | "O" | "">("");
  const [score, setScore] = useState<{ X: number; O: number }>({
    X: 0,
    O: 0,
  });

  const handleSelectFirst = (value: boolean): void => {
    setIsX(value);
  };

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
    setIsX(undefined);
  };

  useEffect(() => {
    if (!isFinish) checkWin();
  }, [checkWin, isFinish]);

  return (
    <Stack
      p={{ xs: "10%" }}
      spacing={2}
      border={"solid 1px #555"}
      borderRadius={"10px"}
      bgcolor={"#fff"}
    >
      <Typography color="secondary" fontWeight={500} fontSize={"3rem"}>
        Tic Tac Toe
      </Typography>

      <Typography
        fontWeight={500}
        fontSize={"2rem"}
        display={"inline-flex"}
        justifyContent={"center"}
        alignItems={"center"}
        letterSpacing={5}
      >
        <Close color="primary" sx={{ fontSize: "3rem", margin: 1 }} />
        {score.X} : {score.O}
        <PanoramaFishEye color="warning" sx={{ fontSize: "3rem", margin: 1 }} />
      </Typography>

      <Typography
        color="error"
        fontWeight={500}
        variant="caption"
        fontSize={"2rem"}
        bgcolor={isFinish && "#ffebee"}
        width={"100%"}
      >
        WINNER : {isFinish}
      </Typography>

      <Typography
        color="textPrimary"
        variant="caption"
        fontSize={"1rem"}
        display={"inline-flex"}
        alignItems={"center"}
        fontWeight={500}
      >
        Next:{" "}
        {isX ? <Close color="primary" /> : <PanoramaFishEye color="warning" />}
      </Typography>

      <Grid2
        container
        border={"solid 1px #555"}
        borderRadius={"10px"}
        p={2}
        bgcolor={isFinish && "#f5f5f5"}
      >
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

      <Box>
        <Button variant="outlined" onClick={handleResetGame}>
          Reset Game
        </Button>
      </Box>

      <Dialog open={isX === undefined} fullWidth>
        <DialogContent>
          <Typography
            fontWeight={500}
            fontSize={"1rem"}
            justifyContent={"center"}
            display={"flex"}
            variant="caption"
            mb={3}
          >
            Which player is first ?
          </Typography>
          <Stack direction={"row"} justifyContent={"center"} spacing={3}>
            <Button variant="outlined" onClick={() => handleSelectFirst(true)}>
              <Close color="primary" />{" "}
            </Button>
            <Button variant="outlined" onClick={() => handleSelectFirst(false)}>
              <PanoramaFishEye color="warning" />
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}

export default App;
