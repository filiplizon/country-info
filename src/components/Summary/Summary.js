import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { db } from 'firebase';
import { doc, setDoc } from 'firebase/firestore';
import illustration from 'assets/images/Location.svg';
import Paragraph from 'components/Paragraph/Paragraph';
import Button from 'components/Button/Button';
import actions from 'actions/actions';

const StyledWrapper = styled.div`
  width: 100%;
  height: ${({ row }) => (row ? '' : '50%')};
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;

  @media (min-width: 1100px) {
    width: ${({ row }) => (row ? '' : '90%')};
  }
`;

const StyledImage = styled.img`
  height: 160px;

  @media (min-width: 360px) {
    height: 215px;
  }

  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1024px) {
    height: 350px;
  }

  @media (min-width: 1200px) {
    height: 200px;
  }
`;

const StyledParagraph = styled(Paragraph)`
  margin-bottom: 5px;
  width: 90%;
  text-align: center;

  @media (min-width: 360px) {
    font-size: ${({ theme }) => theme.fontSize.s};
  }
  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.l};
  }

  @media (min-width: 1024px) {
    font-size: ${({ theme }) => theme.fontSize.xxl};
  }

  @media (min-width: 1024px) and (orientation: landscape) {
    font-size: ${({ theme }) => theme.fontSize.m};
    width: 100%;
  }
`;

const Summary = ({
  points,
  quizLength,
  resetLevel,
  resetType,
  level,
  setBestScore,
  quizType,
  time,
  setCountriesLevel,
  setQuizQuestions,
  startQuiz,
  setNextLevel,
  levels,
  user,
}) => {
  const saveDataToDB = async () => {
    const docRef = doc(db, 'users', user.id);
    const { ...currentUser } = user;
    await setDoc(docRef, currentUser);
  };

  useEffect(() => {
    setBestScore(points, level, quizType);
    saveDataToDB();
  }, []);

  return (
    <StyledWrapper>
      <StyledImage src={illustration} alt="" />
      <StyledParagraph>
        You answered correctly to{' '}
        <b>
          {points} / {quizLength}
        </b>{' '}
        questions.
      </StyledParagraph>
      <StyledParagraph>
        Your time: <b>{`${time.minutes}:${time.seconds}:${time.miliseconds}`}</b>
      </StyledParagraph>

      <StyledWrapper row>
        <Button
          secondary
          onClick={() => {
            resetLevel(level);
            setCountriesLevel();
            setQuizQuestions(level);
            startQuiz();
          }}
        >
          Try again
        </Button>
        {level !== 'hard' ? (
          <Button
            onClick={() => {
              resetLevel();
              setNextLevel(level);
              setQuizQuestions(levels[level].next);
              startQuiz();
            }}
            secondary
          >
            Next level
          </Button>
        ) : (
          <Button
            onClick={() => {
              resetLevel();
              resetType();
            }}
            secondary
          >
            Finish game
          </Button>
        )}
      </StyledWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = (state) => {
  const { points, quizLength, level, levels, quizType, time, user } = state;
  return { points, quizLength, level, levels, quizType, time, user };
};

const mapDispatchToProps = (dispatch) => ({
  resetLevel: (level) => dispatch(actions.resetLevel(level)),
  resetType: () => dispatch(actions.resetType()),
  setNextLevel: (level) => dispatch(actions.setNextLevel(level)),
  setBestScore: (score, level, quizType) => dispatch(actions.setBestScore(score, level, quizType)),
  setCountriesLevel: () => dispatch(actions.setCountriesLevel()),
  setQuizQuestions: (level) => dispatch(actions.setQuizQuestions(level)),
  startQuiz: () => dispatch(actions.startQuiz()),
  saveGame: () => dispatch(actions.saveGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
