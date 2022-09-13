import React from 'react';

import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = ({ match, getPoll, poll }) => {
  getPoll(match.params.id);

  return (
    <div>
      <center>
      <ErrorMessage />
      <Poll />
      </center>
    </div>
  );
};

export default PollPage;
