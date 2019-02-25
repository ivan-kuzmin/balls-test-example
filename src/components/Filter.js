import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Spinner from './Spinner'
import Language from './Language'

const Background = styled.div`
  background: rgba(0,0,0,0.7);
  position: absolute;
  left: 20%;
  width: 80%;
  height: 100%;
  transform: translateY(${props => props.visible ? '0' : '-100%'});
  opacity: ${props => props.visible ? '1' : '0'};
  transition: ${props => props.visible ? '0.4s' : '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
`

const ResultsContainer = styled.div`
  min-width: 500px;
  height: 500px;
  -webkit-box-shadow: 10px -10px 0px 0px rgba(0,0,0,0.7);
  -moz-box-shadow: 10px -10px 0px 0px rgba(0,0,0,0.7);
  box-shadow: 10px -10px 0px 0px rgba(0,0,0,0.7);
`

const Results = styled.div`
  overflow: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Filter = (props) => {
  const { lang, changeLanguage, current_lang, status, user, results, Result, newGame } = props
  return (
    <Background id="filter" visible={!newGame}>
      <ResultsContainer id="results_container" className="bg-warning pt-4 pb-3 px-3 d-flex flex-column">
        <h3 className="text-center text-uppercase mb-3 font-weight-bold">{lang.last_results}:</h3>
        <Results id="results" className="flex-fill bg-dark text-light py-3 text-center px-4">
          {
            status ?
              <div>
                <h5 className="mt-2 mb-3">User: {user.username}</h5>
                <ul className="m-0 p-0" style={{listStylePosition: "inside"}}>
                  {results.map((result, i) => <Result key={i} result={result} />)}
                </ul>
                <div>...</div>
              </div> :
              <Spinner />
          }
        </Results>
      </ResultsContainer>
      <Language current_lang={current_lang} changeLanguage={changeLanguage} />
    </Background>
  )
}

Filter.propTypes = {
  newGame: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  results: PropTypes.array,
  status: PropTypes.bool.isRequired,
  current_lang: PropTypes.string.isRequired,
  lang: PropTypes.object.isRequired,
  changeLanguage: PropTypes.func.isRequired,
  Result: PropTypes.func.isRequired,
};

export default Filter;
