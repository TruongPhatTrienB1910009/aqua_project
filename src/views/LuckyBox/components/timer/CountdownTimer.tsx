/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-else-return */
import styled from 'styled-components';
import { useState } from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from './useCountdown';

const ExpiredNotice = () => {
    return (
        <ExpiredCSS>
            <div className="expired-notice">
                <span>Expired!!!</span>
            </div>
        </ExpiredCSS>
    );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter">
            <a
                className="countdown-link"
            >
                <DateTimeDisplay value={days} type={'Days'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
            </a>
        </div>
    );
};

const CountdownTimer = ({ targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <CountdownTimerCSS >
                <ShowCounter
                    days={days}
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                />
            </CountdownTimerCSS>
        );
    }
};

export default CountdownTimer;


const ExpiredCSS = styled.div`
.expired-notice {
    text-align: center;
    padding: 2rem;
    border: 1px solid #ebebeb;
    border-radius: 0.25rem;
    margin: 0.5rem;
}

.expired-notice>span {
    font-size: 2.5rem;
    font-weight: bold;
    color: white;
}

.expired-notice>p {
    font-size: 1.5rem;
}
`

const CountdownTimerCSS = styled.div`

.show-counter {
    padding: 0.5rem;
}

.show-counter .countdown-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.75rem;
    padding: 0.5rem;
    border: 1px solid #ebebeb;
    border-radius: 0.25rem;
    text-decoration: none;
    color: #000;
}

.show-counter .countdown {
    line-height: 1.25rem;
    padding: 0 3rem 0 3rem;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.show-counter .countdown.danger {
    color: #ff0000;
}

.show-counter .countdown>p {
    margin: 0;
}

.show-counter .countdown>span {
    text-transform: uppercase;
    font-size: 0.75rem;
    line-height: 1rem;
    color: white;
}
`