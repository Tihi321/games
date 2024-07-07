import { createSignal, createEffect, For, Component } from "solid-js";
import { styled } from "solid-styled-components";
import { Button, TextField, Checkbox, Box } from "@suid/material";
import CasinoIcon from "@suid/icons-material/Casino";

const DiceContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const Die = styled(Box)`
  width: 50px;
  height: 50px;
  border: 2px solid #333;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

export const DiceRoller: Component = () => {
  const [numDice, setNumDice] = createSignal<number>(3);
  const [diceValues, setDiceValues] = createSignal<number[]>([]);
  const [selectedDice, setSelectedDice] = createSignal<boolean[]>([]);

  createEffect(() => {
    setDiceValues(Array(numDice()).fill(1));
    setSelectedDice(Array(numDice()).fill(false));
  });

  const rollDice = () => {
    setDiceValues((prev) =>
      prev.map((_, index) =>
        selectedDice()[index] ? Math.floor(Math.random() * 6) + 1 : prev[index]
      )
    );
  };

  const toggleDieSelection = (index: number) => {
    setSelectedDice((prev) => {
      const newSelection = [...prev];
      newSelection[index] = !newSelection[index];
      return newSelection;
    });
  };

  return (
    <div>
      <TextField
        type="number"
        label="Number of Dice"
        value={numDice()}
        onChange={(e) => setNumDice(parseInt(e.target.value) || 1)}
        inputProps={{ min: 1, max: 10 }}
      />
      <Button
        variant="contained"
        onClick={rollDice}
        startIcon={<CasinoIcon />}
        sx={{ marginLeft: "10px" }}
      >
        Roll Dice
      </Button>
      <DiceContainer>
        <For each={diceValues()}>
          {(value, index) => (
            <Die
              sx={{
                backgroundColor: selectedDice()[index()] ? "#e0e0e0" : "white",
              }}
              onClick={() => toggleDieSelection(index())}
            >
              {value}
            </Die>
          )}
        </For>
      </DiceContainer>
      <Box sx={{ marginTop: "20px" }}>
        <Checkbox
          checked={selectedDice().every(Boolean)}
          indeterminate={selectedDice().some(Boolean) && !selectedDice().every(Boolean)}
          onChange={() => setSelectedDice((prev) => prev.map(() => !prev.every(Boolean)))}
        />
        Select/Deselect All
      </Box>
    </div>
  );
};
