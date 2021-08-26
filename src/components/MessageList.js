import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Api from "../api";
import { MessageColumn } from "./MessageColumn";
import styled from "styled-components";
import { uniqueId } from "lodash";
import { Snackbar } from "@material-ui/core";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  flex: 1;
`;

const StyledButton = styled(Button)`
  background-color: #88fca3 !important;
  color: black;
  font-weight: bold !important;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export class MessageList extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      messages: [],
      lastError: null,
    };
  }

  api = new Api({
    messageCallback: (message) => {
      this.messageCallback(message);
    },
  });

  componentDidMount() {
    this.api.start();
  }

  messageCallback(message) {
    const { messages } = this.state;
    const newMessage = { ...message, id: uniqueId() };
    messages.unshift(newMessage);
    if (message.priority == 1) {
      this.setState({
        lastError: newMessage,
      });
    }
    this.setState(
      {
        messages: [...messages.slice()],
      },
      () => {
        // Included to support initial direction. Please remove upon completion
      }
    );
  }

  renderButton() {
    const isApiStarted = this.api.isStarted();
    return (
      <StyledButton
        variant="contained"
        style={{ marginRight: "5px" }}
        onClick={() => {
          if (isApiStarted) {
            this.api.stop();
          } else {
            this.api.start();
          }
          this.forceUpdate();
        }}
      >
        {isApiStarted ? "STOP" : "START"}
      </StyledButton>
    );
  }

  handleDelete = (id) => {
    this.setState({
      messages: this.state.messages.filter((m) => m.id != id),
    });
  };

  handleDeleteAll = () => {
    this.setState({
      messages: [],
    });
  };

  handleCloseSnackbar = (id) => {
    this.setState({
      lastError: null,
    });
  };

  render() {
    return (
      <div style={{ maxWidth: "992px", margin: "0 auto" }}>
        <ButtonsContainer>
          {this.renderButton()}
          <StyledButton
            variant="contained"
            onClick={() => this.handleDeleteAll()}
          >
            CLEAR
          </StyledButton>
        </ButtonsContainer>
        <Row>
          <Column>
            <MessageColumn
              messages={this.state.messages.filter((m) => m.priority === 1)}
              type={1}
              onDelete={(id) => this.handleDelete(id)}
            />
          </Column>
          <Column>
            <MessageColumn
              messages={this.state.messages.filter((m) => m.priority === 2)}
              type={2}
              onDelete={(id) => this.handleDelete(id)}
            />
          </Column>
          <Column>
            <MessageColumn
              messages={this.state.messages.filter((m) => m.priority === 3)}
              type={3}
              onDelete={(id) => this.handleDelete(id)}
            />
          </Column>
        </Row>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={this.state.lastError != null}
          autoHideDuration={2000}
          message={this.state.lastError?.message || ""}
          onClose={() => this.handleCloseSnackbar(this.state.lastError?.id)}
          action={
            <React.Fragment>
              <Button
                size="small"
                aria-label="close"
                color="secondary"
                onClick={() =>
                  this.handleCloseSnackbar(this.state.lastError?.id)
                }
              >
                Close
              </Button>
            </React.Fragment>
          }
        />
      </div>
    );
  }
}

export default MessageList;
