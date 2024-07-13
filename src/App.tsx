import { createSignal, Show, For, onMount } from "solid-js";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@suid/material";
import MenuIcon from "@suid/icons-material/Menu";
import replace from "lodash/replace";
import startCase from "lodash/startCase";
import { styled } from "solid-styled-components";
import { WebGames } from "./pages/WebGames";
import { Footer } from "./components/layout/Footer";
import { DiceRoller } from "./tools/DiceRoller";
import { Embed } from "./components/embed/Embed";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const tools: string[] = ["webgames", "dice-roller", "recko", "krizko"];

export const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal<boolean>(false);
  const [selectedPath, setSelectedPath] = createSignal<string>("webgames");

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen());

  const selectTool = (toolName: string) => {
    setSelectedPath(toolName);
    history.pushState({}, "", `?path=${toolName}`);
    setIsDrawerOpen(false);
  };

  onMount(() => {
    const initialPath = location.search.replace("?path=", "");
    if (tools.includes(initialPath)) {
      setSelectedPath(initialPath);
    }
  });

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen()} onClose={toggleDrawer}>
        <List sx={{ width: "250px" }}>
          <For each={tools}>
            {(toolName, index) => (
              <ListItemButton onClick={() => selectTool(toolName)}>
                {index() + 1}. <ListItemText primary={startCase(replace(toolName, "-", " "))} />
              </ListItemButton>
            )}
          </For>
        </List>
      </Drawer>

      <Box component="main" sx={{ flex: 1, display: "flex", width: "100%" }}>
        <Content>
          <Show when={selectedPath()}>
            {selectedPath() === "webgames" && <WebGames />}
            {selectedPath() === "dice-roller" && <DiceRoller />}
            {selectedPath() === "recko" && (
              <Embed src="https://recko.tihomir-selak.from.hr" title="Recko" />
            )}
            {selectedPath() === "krizko" && (
              <Embed src="https://krizko.tihomir-selak.from.hr" title="Krizko" />
            )}
          </Show>
        </Content>
      </Box>
      <Footer />
    </Container>
  );
};
