import { Component } from "solid-js";
import { styled } from "solid-styled-components";

const Iframe = styled("iframe")`
  width: 100%;
  height: 100%;
  border: none;
`;

interface EmbedProps {
  src: string;
  title: string;
}

export const Embed: Component<EmbedProps> = ({ src, title }) => {
  return <Iframe src={src} title={title} />;
};
