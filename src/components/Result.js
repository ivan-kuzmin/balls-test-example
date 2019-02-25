import React from 'react';
import PropTypes from 'prop-types';

const Result = (props) => {
  const { result } = props
  return (
    <li className={`${result.success ? 'text-success' : 'text-danger'}`}>
      <span className='text-light'>
        <span>{result.created_at} – </span>
        <b className='text-success ml-1'>{result.true_balls} </b>
        <b className='text-danger mr-1'>{result.false_balls} </b>
        <span>Level: {result.level}, </span>
        <span>Balls: {result.balls}, </span>
        <span>Speed: {result.speed}, </span>
        <span>Red Balls: {result.red_balls}</span>
      </span>
    </li>
  )
}

Result.propTypes = {
  result: PropTypes.object.isRequired,
};

export default Result;
