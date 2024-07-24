import { createSignal, Show, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { WebGames } from "./pages/WebGames";
import { Frame } from "./components/layout/Frame";
import { DiceRoller } from "./tools/DiceRoller/DiceRoller";
import { Embed } from "./components/embed/Embed";
import { getURLParams } from "./utils";
import { replace, startCase } from "lodash";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const tools: string[] = ["dice-roller", "webgames", "kvizollama", "recko", "krizko"];

export const App = () => {
  const [selectedPath, setSelectedPath] = createSignal<string>();

  onMount(() => {
    const initialPath = getURLParams("path");
    setSelectedPath(initialPath || "dice-roller");
    document.title = `Games - ${startCase(replace("dice-roller", "-", " "))}`;
  });

  return (
    <Container>
      <Frame
        tools={tools}
        onToolChange={(toolName: string) => {
          history.pushState({}, "", `?path=${toolName}`);
          setSelectedPath(toolName);
        }}
      >
        <Show when={selectedPath()}>
          {selectedPath() === "dice-roller" && <DiceRoller />}
          {selectedPath() === "webgames" && <WebGames />}
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
