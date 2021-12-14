// import React from 'react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from 'actions/actions';
// import _ from 'lodash';

const AnswerBox = ({
  answers,
  quizType,
  setCurrentAnswer,
  checkAnswer,
  currentAnswer,
  correctAnswer,
  isChecked,
  isAnswerCorrect,
  changeQuestion,
  setAnswers,
  counter,
  setCurrentQuestion,
  countriesForQuiz,
  currentQuestion,
}) => {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    setAnswers(currentQuestion);
    setActive(false);
  }, [currentQuestion]);

  // const showCorrectAnswer = () => {};
  return (
    <>
      <StyledAnswerBox>
        {answers.map((answer, i) =>
          quizType === 'flags' ? (
            <StyledAnswer
              isAnswerCorrect={isAnswerCorrect}
              isChecked={isChecked}
              className={
                isActive === i
                  ? 'active'
                  : `${isChecked && correctAnswer === answer.name && 'correct'}`
              }
              onClick={() => {
                !isChecked && setActive(i); // eslint-disable-line
                setCurrentAnswer(answer.name);
              }}
              key={`${answer.name}-${answer.alpha3Code}`}
            >
              {answer.name}
            </StyledAnswer>
          ) : (
            <StyledAnswer
              isAnswerCorrect={isAnswerCorrect}
              isChecked={isChecked}
              className={
                isActive === i
                  ? 'active'
                  : `${isChecked && correctAnswer === answer.capital && 'correct'}`
              }
              onClick={() => {
                !isChecked && setActive(i); // eslint-disable-line
                setCurrentAnswer(answer.capital);
              }}
              key={`${answer.capital}-${answer.alpha3Code}`}
            >
              {answer.capital}
            </StyledAnswer>
          ),
        )}
      </StyledAnswerBox>
      <StyledButton
        onClick={() => {
          currentAnswer && !isChecked && checkAnswer(currentAnswer, correctAnswer); // eslint-disable-line
          isChecked && changeQuestion(counter + 1); // eslint-disable-line
          isChecked && counter !== 9 && setCurrentQuestion(countriesForQuiz[counter + 1], quizType); // eslint-disable-line
        }}
      >
        {isChecked ? `${counter === 9 ? 'Finish' : 'Next'}` : 'Check'}
      </StyledButton>
    </>
  );
};
const StyledAnswerBox = styled.div`
  width: 100%;
  height: 20vh;
  position: absolute;
  bottom: 10vh;
  display: flex;
  flex-wrap: wrap;
  @media (min-width: 1100px) {
    height: 15vh;
    width: 80%;
  }
`;

const StyledAnswer = styled.button`
  height: 50%;
  width: 50%;
  border: 1px solid #fff;
  background-color: ${({ theme }) => theme.secondary};
  color: #fff;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSize.s};

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  &.correct {
    background-color: green;
  }

  &.active {
    background-color: ${({ theme, isAnswerCorrect, isChecked }) =>
      (isAnswerCorrect && isChecked && 'green') ||
      (!isAnswerCorrect && isChecked && 'red') ||
      (!isChecked && theme.primary)};
  }

  @media (min-width: 1100px) {
    font-size: 1.3rem;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 10vh;
  position: absolute;
  bottom: 0;
  color: ${({ theme }) => theme.primary};
  background-color: #fff;
  border: none;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: 600;
  cursor: pointer;

  @media (min-width: 1100px) {
    width: 30%;
    height: 5vh;
    border: none;
    font-size: 1.3rem;
    background-color: ${({ theme }) => theme.secondary};
    color: #fff;

    &:hover {
      background-color: ${({ theme }) => theme.primary};
    }
  }
`;

const mapDispatchToProps = (dispatch) => ({
  setCurrentAnswer: (answer) => dispatch(actions.setCurrentAnswer(answer)),
  checkAnswer: (answer, correctAnswer) => dispatch(actions.checkAnswer(answer, correctAnswer)),
  changeQuestion: (answer, correctAnswer) =>
    dispatch(actions.changeQuestion(answer, correctAnswer)),
  setAnswers: () => dispatch(actions.setAnswers()),
  setCurrentQuestion: (question, quizType) =>
    dispatch(actions.setCurrentQuestion(question, quizType)),
});

const mapStateToProps = (state) => {
  const {
    answers,
    quizType,
    currentAnswer,
    correctAnswer,
    isChecked,
    isAnswerCorrect,
    countriesForQuiz,
    counter,
    currentQuestion,
  } = state;
  return {
    answers,
    quizType,
    currentAnswer,
    correctAnswer,
    isChecked,
    isAnswerCorrect,
    countriesForQuiz,
    counter,
    currentQuestion,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerBox);