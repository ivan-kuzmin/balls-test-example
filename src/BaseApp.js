import { Component } from 'react';

class BaseApp extends Component {
  onSetAppState = (newState, callback) => this.setState(newState, callback)

  getUser = () => {
    const { url, token } = this.state
    fetch(url, { headers: { Authorization: `Token ${token}` } })
    .then(response => response.json())
    .then(data => this.getUserSuccess(data))
    .catch((err) => { console.log('Fetch Error: ', err) })
  }

  saveResult = (result) => {
    const { url, token } = this.state
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(result),
    })
    .then(response => response.json())
    .then(data => this.saveResultSuccess(data))
    .catch((err) => { console.log('Fetch Error: ', err);

      if (this.state.playedGames + 1 === this.state.countOfGames) {
        this.setState({ newGame: false, playedGames: 0 }, this.state.startNewGame);
      } else {
        this.setState({ playedGames: this.state.playedGames + 1 }, this.state.startNewGame);
      }
    })
    // this.saveResultSuccess({
    //   current_level: {
    //     level: 1,
    //     balls: 12,
    //     speed: 3,
    //     red_balls: 4,
    //   },
    //   results: [result],
    // })
  }

  changeLanguage = () => {
    let { current_lang } = this.state
    current_lang = (current_lang === 'ru') ? 'en' : 'ru'
    this.props.cookies.set('language', current_lang, { path: '/' })
    this.setState({ current_lang })
  }

  componentDidMount() { if (this.state.token) this.getUser() }
};

export default BaseApp;
