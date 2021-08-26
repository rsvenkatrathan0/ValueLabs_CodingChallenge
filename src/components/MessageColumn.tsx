import { Message } from "../models";
import { MessageItem } from "./MessageItem";
import styled from "styled-components";

export interface Props {
  messages: Message[];
  type: number;
  onDelete: (id: string) => {};
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessageColumn = ({ messages, type, onDelete }: Props) => {
  const getType = () => {
    switch (type) {
      case 1:
        return `Error Type ${type}`;
      case 2:
        return `Warning Type ${type}`;
      case 3:
        return `Info Type ${type}`;
    }
  };

  const handleClear = (id: string) => {};

  return (
    <Column>
      <h1 style={{ marginBottom: "0" }}>{getType()}</h1>
      <span>Count {messages.length}</span>
      {messages.map((m, i) => (
        <MessageItem message={m} key={m.id} onClear={(id) => onDelete(id)} />
      ))}
    </Column>
  );
};
