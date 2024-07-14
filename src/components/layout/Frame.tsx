import { styled } from "solid-styled-components";
import { createSignal, For, Component } from "solid-js";
import { Drawer, List, ListItemButton, ListItemText, IconButton } from "@suid/material";
import MenuIcon from "@suid/icons-material/Menu";
import replace from "lodash/replace";
import startCase from "lodash/startCase";
import { Footer } from "./Footer";

const MenuContainer = styled("nav")`
  background-color: ${(props) => props?.theme?.colors.darkBackground};
  color: ${(props) => props?.theme?.colors.text};
  display: flex;
  position: fixed;
  top: 0;
  width: 24px;
  height: 100vh;
  svg {
    width: 16px;
    height: 16px;
  }
`;

const FooterContainer = styled("footer")`
  display: flex;
  position: fixed;
  bottom: 0;
  height: 38px;
  background-color: ${(props) => props?.theme?.colors.darkBackground};
  color: ${(props) => props?.theme?.colors.text};
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 0 16px;
`;

const Content = styled.div`
  flex: 1;
  padding-bottom: 38px;
  padding-left: 24px;
`;

interface FrameProps {
  onToolChange: (toolName: string) => void;
  tools: string[];
  children?: any;
}

export const Frame: Component<FrameProps> = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = createSignal<boolean>(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen());

  const selectTool = (toolName: string) => {
    props.onToolChange(toolName);
    history.pushState({}, "", `?path=${toolName}`);
    setIsDrawerOpen(false);
  };

  return (
    <>
      <MenuContainer>
        <Drawer anchor="left" open={isDrawerOpen()} onClose={toggleDrawer}>
          <List sx={{ width: "250px" }}>
            <For each={props.tools}>
              {(toolName, index) => (
                <ListItemButton onClick={() => selectTool(toolName)}>
                  {index() + 1}. <ListItemText primary={startCase(replace(toolName, "-", " "))} />
                </ListItemButton>
              )}
            </For>
          </List>
        </Drawer>
        <IconButton size="small" color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </MenuContainer>
      <Content>{props.children}</Content>
      <FooterContainer>
        <Footer />
      </FooterContainer>
    </>
  );
};
