import { For } from "solid-js";
import { Box } from "@suid/material";

// Mock data for the games
const games = [
  {
    name: "Space Labyrinth",
    description: "Navigate through the maze of space.",
    url: "godot/space-labyrint",
  },
  // Add more games here
];

export const WebGames = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
      <h1>Web Games</h1>
      <For each={games}>
        {(game) => (
          <Box
            sx={{
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              width: "80%",
              textAlign: "center",
            }}
          >
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <a href={`${window.location.origin}/${game.url}`}>Play Now</a>
          </Box>
        )}
      </For>
    </Box>
  );
};
