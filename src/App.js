import React from "react";
import { withCookies } from "react-cookie";
import BaseApp from "./BaseApp";
import Menu from "./components/Menu";
import Filter from "./components/Filter";
import Result from "./components/Result";
import P5Wrapper from "./P5Wrapper";
import sketch from "./P5Wrapper/sketch";
import { lang } from "./lang";

export class App extends BaseApp {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      url: "http://localhost:8000/balls/results/",
      token: this.props.cookies.get("token") || "token",
      user: { username: "" },
      current_lang: this.props.cookies.get("language") || "en",
      newGame: false,
      level: 1,
      ballsCount: 12,
      speed: 3,
      targetBallsCount: 4,
      radius: 50,
      playedGames: 0,
      countOfGames: 3,
    };
  }

  getUserSuccess = data => {
    this.setState({
      status: true,
      user: { username: data.username },
      level: data.current_level.level,
      ballsCount: data.current_level.balls,
      speed: data.current_level.speed,
      targetBallsCount: data.current_level.red_balls,
      results: data.results
    });
  };

  generateResult = () => {
    const {
      ballsCount,
      targetBallsCount,
      targetBalls,
      selectedBalls,
      level,
      speed,
      radius
    } = this.state;
    let trueBalls = 0;
    let falseBalls = 0;
    let clickedBalls = {};
    for (let ball of selectedBalls) {
      ball.id >= ballsCount - targetBallsCount ? trueBalls++ : falseBalls++;
      clickedBalls[ball.id] = { x: ball.x.toFixed(3), y: ball.y.toFixed(3) };
    }
    const result = {
      success: trueBalls === targetBallsCount && falseBalls === 0,
      level: level,
      true_balls: trueBalls,
      false_balls: falseBalls,
      balls: ballsCount,
      red_balls: targetBallsCount,
      target_balls: targetBalls,
      clicked_balls: clickedBalls,
      speed: speed,
      radius: radius
    };
    this.saveResult(result);
  };

  saveResultSuccess = data => {
    const { startNewGame, playedGames, countOfGames } = this.state;
    // const { level, balls, speed, red_balls } = data.current_level;
    const level = 1,
          balls = 12,
          speed = 3,
          red_balls = 4
    this.setState(
      {
        level,
        ballsCount: balls,
        speed,
        targetBallsCount: red_balls,
        results: data.results
      },
      () => {
        if (playedGames + 1 === countOfGames) {
          this.setState({ newGame: false, playedGames: 0 }, startNewGame);
        } else {
          this.setState({ playedGames: playedGames + 1 }, startNewGame);
        }
      }
    );
  };

  newGameButtonClick = () => {
    const { startNewGame } = this.state;
    this.setState({ newGame: true }, startNewGame);
  };

  render() {
    const {
      newGame,
      ballsCount,
      targetBallsCount,
      speed,
      level,
      radius,
      playedGames,
      countOfGames,
      current_lang,
      status,
      results,
      user,
      token
    } = this.state;
    return (
      <div className="w-100 h-100 d-flex">
        <Menu
          token={token}
          current_level={{
            level,
            balls: ballsCount,
            speed,
            red_balls: targetBallsCount
          }}
          radius={radius}
          lang={lang[current_lang]}
          newGameButtonClick={this.newGameButtonClick}
        />
        <Filter
          newGame={newGame}
          user={user}
          results={results}
          status={status}
          current_lang={current_lang}
          lang={lang[current_lang]}
          changeLanguage={this.changeLanguage}
          Result={Result}
        />
        <P5Wrapper
          p5Props={{
            newGame,
            ballsCount,
            targetBallsCount,
            speed,
            level,
            radius,
            playedGames,
            countOfGames,
            generateResult: this.generateResult
          }}
          sketch={sketch}
          onSetAppState={this.onSetAppState}
        />
      </div>
    );
  }
}

export default withCookies(App);
