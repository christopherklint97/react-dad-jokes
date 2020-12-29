import React from "react";
import axios from "axios";
import Joke, { JokeProps } from "./Joke";
import "./JokeList.css";

interface JokeListProps {
  numJokesToGet: number;
}

class JokeList extends React.Component<JokeListProps, { jokes: JokeProps[] }> {
  constructor(props: JokeListProps) {
    super(props);
    this.state = { jokes: [] };

    this.generateNewJokes = this.generateNewJokes.bind(this);
    this.vote = this.vote.bind(this);
  }

  static defaultProps = {
    numJokesToGet: 10,
  };

  /* get jokes if there are no jokes */

  async componentDidMount() {
    if (this.state.jokes.length === 0) {
      let j: JokeProps[] = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" },
          });
          let { status, ...jokeObj } = res.data;

          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({ jokes: j });
      } catch (e) {
        console.log(e);
      }
    }
  }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState({ jokes: [] });
  }

  /* change vote for this id by delta (+1 or -1) */

  vote(id: number, delta: number) {
    this.setState({
      jokes: this.state.jokes.map((j) =>
        j.id === id ? { ...j, votes: j.votes + delta } : j
      ),
    });
  }

  /* render: either loading spinner or list of sorted jokes. */

  render() {
    if (this.state.jokes.length) {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);

      return (
        <div className="JokeList">
          <button className="JokeList-getmore" onClick={this.generateNewJokes}>
            Get New Jokes
          </button>

          {sortedJokes.map((j) => (
            <Joke
              joke={j.joke}
              key={j.id}
              id={j.id}
              votes={j.votes}
              vote={this.vote}
            />
          ))}
        </div>
      );
    }

    return null;
  }
}

export default JokeList;
