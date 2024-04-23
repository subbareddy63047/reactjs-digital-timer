// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {timer: 25, secs: '00', start: false, count: 1}

  timerId = null

  incrementTime = () => {
    const {start} = this.state
    if (start === false) {
      this.setState(prevState => ({...prevState, timer: prevState.timer + 1}))
    }
  }

  decrementTime = () => {
    const {start} = this.state
    if (start === false) {
      this.setState(prevState => ({...prevState, timer: prevState.timer - 1}))
    }
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({timer: 25, secs: '00', start: false, count: 1})
  }

  min = prevState => {
    const {count} = prevState
    if (count === 1) {
      return prevState.timer - 1
    }
    return prevState.timer
  }

  seconds = prevState => {
    const {count} = this.state
    const value = 60 - count
    if (value === 0) {
      this.setState({...prevState, secs: '00', count: 1})
    }
    if (value >= 10) {
      return value.toString()
    }
    return '0'.concat(value.toString())
  }

  startAndPause = event => {
    if (event.target.getAttribute('data-btn') !== 'Start') {
      clearInterval(this.timerId)
      this.setState(prevState => ({...prevState, start: false}))
    } else if (event.target.getAttribute('data-btn') === 'Start') {
      this.timerId = setInterval(() => {
        this.setState(prevState => ({
          start: true,
          timer: this.min(prevState),
          secs: this.seconds(prevState),
          count: prevState.count + 1,
        }))
      }, 1000)
    }
  }

  render() {
    const {timer, start, secs} = this.state
    return (
      <div className="timer-container">
        <div className="timer-container__container">
          <h1 className="container__heading">Digital Timer</h1>
          <div className="container__timer-and-control">
            <div className="timer-and-control__timer">
              <div className="timer__container">
                <h1 className="container__time">
                  {timer}:{secs}
                </h1>
                <p className="container__status">
                  {start ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="timer-and-control__control">
              <div className="control__buttons-container">
                <button
                  className="start-btn"
                  type="button"
                  onClick={this.startAndPause}
                >
                  {start ? (
                    <div className="icon-container" data-btn="Pause">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                        alt="pause icon"
                        data-btn="Pause"
                      />
                      <p data-btn="Pause">Pause</p>
                    </div>
                  ) : (
                    <div className="icon-container" data-btn="Start">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                        alt="play icon"
                        data-btn="Start"
                      />
                      <p data-btn="Start">Start</p>
                    </div>
                  )}
                </button>
                <button
                  type="button"
                  className="start-btn"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>

              <div className="control__set-timer-container">
                <p className="text">Set Timer limit</p>
                <div className="time-control-btn-container">
                  <button
                    type="button"
                    className="minus"
                    onClick={this.decrementTime}
                  >
                    -
                  </button>
                  <div className="time">
                    <p>{timer}</p>
                  </div>
                  <button
                    type="button"
                    className="puls"
                    onClick={this.incrementTime}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
