import * as React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { Message } from "../models";
import styled from "styled-components";

export interface MessageProps {
  message: Message;
  onClear: (id: string) => {};
}

const StyledCard = styled(Card)`
  margin: 5px;
  background-color: ${(props) => props.color}!important;
`;

export const MessageItem = ({ message, onClear }: MessageProps) => {
  const getBackgroundColor = () => {
    switch (message.priority) {
      case 1:
        return "#F56236";
      case 2:
        return "#FCE788";
      case 3:
        return "#88FCA3";
    }
  };
  return (
    <StyledCard color={getBackgroundColor()} data-testid={"bgtest"}>
      <CardContent>
        <Typography variant={"body2"} component={"p"}>
          {message.message}
        </Typography>
        <div style={{ textAlign: "right" }}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => onClear(message.id)}
          >
            Clear
          </span>
        </div>
      </CardContent>
    </StyledCard>
  );
};
