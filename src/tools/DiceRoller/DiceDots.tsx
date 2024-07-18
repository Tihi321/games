import { For, Component } from "solid-js";
import { Box } from "@suid/material";

export const DiceDots: Component<{ value: number }> = (props) => {
  const dotPositions = [
    [],
    [[50, 50]],
    [
      [25, 25],
      [75, 75],
    ],
    [
      [25, 25],
      [50, 50],
      [75, 75],
    ],
    [
      [25, 25],
      [25, 75],
      [75, 25],
      [75, 75],
    ],
    [
      [25, 25],
      [25, 75],
      [50, 50],
      [75, 25],
      [75, 75],
    ],
    [
      [25, 25],
      [25, 50],
      [25, 75],
      [75, 25],
      [75, 50],
      [75, 75],
    ],
  ];

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <For each={dotPositions[props.value]}>
        {([x, y]) => (
          <Box
            sx={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#333",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </For>
    </Box>
  );
};
