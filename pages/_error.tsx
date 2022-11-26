import { NextPageContext } from 'next';

import Shared from 'components/layout/Shared';

type Props = {
  statusCode?: number;
};

const Error = ({ statusCode }: Props) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.Layout = Shared;

export default Error;
