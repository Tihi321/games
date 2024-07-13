import { createSignal, Show, onMount } from "solid-js";
import { styled } from "solid-styled-components";
import { WebGames } from "./pages/WebGames";
import { Footer } from "./components/layout/Footer";
import { DiceRoller } from "./tools/DiceRoller";
import { Embed } from "./components/embed/Embed";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 46px;
`;

const tools: string[] = ["webgames", "dice-roller", "kvizollama", "recko", "krizko"];

export const App = () => {
  const [selectedPath, setSelectedPath] = createSignal<string>("webgames");

  onMount(() => {
    const initialPath = location.search.replace("?path=", "");
    setSelectedPath(initialPath);
  });

  return (
    <Container>
      <Content>
        <Show when={selectedPath()}>
          {selectedPath() === "webgames" && <WebGames />}
          {selectedPath() === "dice-roller" && <DiceRoller />}
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
      </Content>
      <Footer tools={tools} onToolChange={(toolName: string) => setSelectedPath(toolName)} />
    </Container>
  );
};
