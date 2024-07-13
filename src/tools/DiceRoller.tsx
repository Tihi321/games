import { createSignal, createEffect, For, Component } from "solid-js";
import { Box, Button, TextField, Checkbox } from "@suid/material";
import CasinoIcon from "@suid/icons-material/Casino";
import RestartAltIcon from "@suid/icons-material/RestartAlt";

export const DiceRoller: Component = () => {
  const [numDice, setNumDice] = createSignal<number>(1);
  const [diceValues, setDiceValues] = createSignal<number[]>([]);
  const [selectedDice, setSelectedDice] = createSignal<boolean[]>([]);
  const [isRolling, setIsRolling] = createSignal<boolean>(false);
  const [consistentRolls, setConsistentRolls] = createSignal<number>(0);
  const [currentSum, setCurrentSum] = createSignal<number>(0);
  const [selectedSum, setSelectedSum] = createSignal<number>(0);

  const rollingSoundEffect = new Audio(
    "https://cdn.tihomir-selak.from.hr/assets/sfx/rolling-dice-roll.mp3"
  );
  const endSoundEffect = new Audio(
    "https://cdn.tihomir-selak.from.hr/assets/sfx/rolling-dice-end.mp3"
  );

  const initializeDice = () => {
    const initialValues = Array(numDice()).fill(1);
    setDiceValues(initialValues);
    setSelectedDice(Array(numDice()).fill(true));
    setCurrentSum(initialValues.reduce((acc, val) => acc + val, 0));
  };

  createEffect(() => {
    initializeDice();
  });

  const rollDice = () => {
    setIsRolling(true);
    rollingSoundEffect.play();

    const rollInterval = setInterval(() => {
      setDiceValues((prev) =>
        prev.map((_, index) =>
          selectedDice()[index] ? Math.floor(Math.random() * 6) + 1 : prev[index]
        )
      );
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const newValues = diceValues().map((_, index) =>
        selectedDice()[index] ? Math.floor(Math.random() * 6) + 1 : diceValues()[index]
      );
      setDiceValues(newValues);
      setIsRolling(false);
      rollingSoundEffect.pause();
      rollingSoundEffect.currentTime = 0;
      endSoundEffect.play();

      const newSum = newValues.reduce((acc, val) => acc + val, 0);
      setCurrentSum(newSum);
      updateSelectedSum(newValues);

      setConsistentRolls((prev) => prev + 1);
    }, 4000);
  };

  const toggleDieSelection = (index: number) => {
    setSelectedDice((prev) => {
      const newSelection = [...prev];
      newSelection[index] = !newSelection[index];
      return newSelection;
    });
    updateSelectedSum(diceValues());
  };

  const updateSelectedSum = (values: number[]) => {
    const newSelectedSum = values.reduce(
      (sum, value, index) => (!selectedDice()[index] ? sum + value : sum),
      0
    );
    setSelectedSum(newSelectedSum);
  };

  const resetAll = () => {
    setConsistentRolls(0);
    initializeDice();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px", gap: "10px" }}>
        <TextField
          type="number"
          label="Number of Dice"
          value={numDice()}
          onChange={(e) => setNumDice(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
          inputProps={{ min: 1, max: 10 }}
        />
        <Button
          variant="contained"
          onClick={rollDice}
          startIcon={<CasinoIcon />}
          disabled={isRolling()}
        >
          {isRolling() ? "Rolling..." : "Roll Dice"}
        </Button>
        <Button variant="outlined" onClick={resetAll} startIcon={<RestartAltIcon />}>
          Reset All
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "20px",
          perspective: "1000px",
          justifyContent: "center",
        }}
      >
        <For each={diceValues()}>
          {(value, index) => (
            <Box
              sx={{
                width: "60px",
                height: "60px",
                border: "2px solid #333",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
                cursor: "pointer",
                backgroundColor: selectedDice()[index()] ? "#e0e0e0" : "white",
                transition: "all 0.5s ease",
                filter: isRolling() && selectedDice()[index()] ? "blur(3px)" : "none",
              }}
              onClick={() => toggleDieSelection(index())}
            >
              {value}
            </Box>
          )}
        </For>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Checkbox
          checked={selectedDice().every(Boolean)}
          indeterminate={selectedDice().some(Boolean) && !selectedDice().every(Boolean)}
          onChange={() => {
            setSelectedDice((prev) => prev.map(() => !prev.every(Boolean)));
            updateSelectedSum(diceValues());
          }}
        />
        <span>Select/Deselect All</span>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <p>Sum of All Dice: {currentSum()}</p>
        <p>Sum of Selected Dice: {selectedSum()}</p>
        <p>Consistent Rolls: {consistentRolls()}</p>
      </Box>
    </Box>
  );
};
