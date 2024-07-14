import { createSignal, Show, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { WebGames } from "./pages/WebGames";
import { Frame } from "./components/layout/Frame";
import { DiceRoller } from "./tools/DiceRoller";
import { Embed } from "./components/embed/Embed";
import { getURLParams } from "./utils";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const tools: string[] = ["webgames", "dice-roller", "kvizollama", "recko", "krizko"];

export const App = () => {
  const [selectedPath, setSelectedPath] = createSignal<string>();

  onMount(() => {
    const initialPath = getURLParams("path");
    setSelectedPath(initialPath || "webgames");
  });

  return (
    <Container>
      <Frame tools={tools} onToolChange={(toolName: string) => setSelectedPath(toolName)}>
        <Show when={selectedPath()}>
          {selectedPath() === "webgames" && <WebGames />}
          {selectedPath() === "dice-roller" && <DiceRoller />}
          {selectedPath() === "godot-space-labyrint" && (
            <Embed src={`${window.location.origin}/godot/space-labyrint`} title="Space Labirint" />
          )}
          {selectedPath() === "kvizollama" && (
            <Embed src="https://kvizollama.tihomir-selak.from.hr?footer=hide" title="Kvizollama" />
          )}
          {selectedPath() === "recko" && (
            <Embed src="https://recko.tihomir-selak.from.hr" title="Recko" />
          )}
          {selectedPath() === "krizko" && (
            <Embed src="https://krizko.tihomir-selak.from.hr" title="Krizko" />
          )}
        </Show>
      </Frame>
    </Container>
  );
};
