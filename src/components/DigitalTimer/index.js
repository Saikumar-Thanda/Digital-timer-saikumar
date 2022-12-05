import {Component} from 'react'

import './index.css'

const InitialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timeLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = InitialState

  componentWillUnmount() {
    this.clearInterval(this.timerIntervalID)
  }

  clearInterval = () => {
    clearInterval(this.timerIntervalID)
  }

  onResetTimer = () => {
    this.clearInterval()
    this.setState(InitialState)
  }

  onDecreaseTimeInMinutes = () => {
    const {timeLimitInMinutes} = this.state
    if (timeLimitInMinutes > 1) {
      this.setState(prevState => ({
        timeLimitInMinutes: prevState.timeLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimeInMinutes = () => {
    this.setState(prevState => ({
      timeLimitInMinutes: prevState.timeLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timeLimitInMinutes, timeElapsedInSeconds} = this.state
    const isDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="timer-limit-logo">Set Timer limit</p>
        <div className="time-limit-controller">
          <button
            className="time-limit-btn"
            onClick={this.onDecreaseTimeInMinutes}
            type="button"
            disabled={isDisabled}
          >
            -
          </button>
          <div className="time-limit-text-container">
            <p className="time-limit-label">{timeLimitInMinutes}</p>
          </div>
          <button
            className="time-limit-btn minus"
            onClick={this.onIncreaseTimeInMinutes}
            type="button"
            disabled={isDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  increaseElapsedTimeInSeconds = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state

    const isTimerCompleted = timeLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.clearInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timeLimitInMinutes,
    } = this.state

    const timerIsCompleted = timeLimitInMinutes * 60 === timeElapsedInSeconds

    if (timerIsCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearInterval()
    } else {
      this.timerIntervalID = setInterval(
        this.increaseElapsedTimeInSeconds,
        1000,
      )
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const pauseOrStartAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const pauseOrStartUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onStartOrPause}
        >
          <img
            src={pauseOrStartUrl}
            className="time-controller-logos"
            alt={pauseOrStartAlt}
          />
          <p className="time-controller-labels">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="time-controller-logos"
            alt="reset icon"
          />
          <p className="time-controller-labels">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timeLimitInMinutes} = this.state
    const timeRemainingInSeconds =
      timeLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(timeRemainingInSeconds / 60)
    const seconds = Math.floor(timeRemainingInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container ">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="label">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
