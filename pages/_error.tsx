import Shared from 'components/layout/shared/Shared';
import { NextPageContext } from 'next';

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
