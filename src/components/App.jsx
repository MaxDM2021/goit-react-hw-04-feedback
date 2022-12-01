import { useReducer } from 'react';

import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Section from './Section';
import Notification from './Notification';

function countReducer(state, action) {
  switch (action.type) {
    case 'good':
      return { ...state, good: state.good + action.payload };

    case 'neutral':
      return { ...state, neutral: state.neutral + action.payload };

    case 'bad':
      return { ...state, bad: state.bad + action.payload };

    default:
      throw new Error(`Unsupported action type ${action.type}`);
  }
}

function init(initialState) {
  return {
    ...initialState,
    good: initialState.good,
    neutral: initialState.neutral,
    bad: initialState.bad,
  };
}

export default function App() {
  const [state, dispatch] = useReducer(
    countReducer,
    { good: 0, neutral: 0, bad: 0 },
    init
  );

  const total = state.good + state.neutral + state.bad;
  const percentage = Math.ceil(state.good * 100) / total;

  const keys = Object.keys(state);

  return (
    <>
      <Section title="Please leave feedback:">
        <FeedbackOptions
          options={keys}
          onLeaveFeedback={(e) => {
            console.log(e);
            dispatch({ type: e.currentTarget.attributes['option'].value, payload: 1 })
          }
          }
        />
      </Section>

      <Section title="Statistics:">
        {total !== 0 ? (
          <Statistics
            valueGood={state.good}
            valueNeutral={state.neutral}
            valueBad={state.bad}
            valueTotal={total}
            valuePercentage={percentage}
          />
        ) : (
          <Notification title="There is no feedback!!!" />
        )}
      </Section>
    </>
  );
}
