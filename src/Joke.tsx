import React from "react";
import "./Joke.css";

export interface JokeProps {
  vote: (id: number, upOrDown: number) => void;
  votes: any;
  id: number;
  joke: string;
}

class Joke extends React.Component<JokeProps> {
  upVote = () => this.props.vote(this.props.id, +1);

  downVote = () => this.props.vote(this.props.id, -1);

  render() {
    return (
      <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={this.upVote}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={this.downVote}>
            <i className="fas fa-thumbs-down" />
          </button>

          {this.props.votes}
        </div>

        <div className="Joke-text">{this.props.joke}</div>
      </div>
    );
  }
}

export default Joke;
