import { useRouteError } from "react-router-dom";

type Props = {
  error?: Error,
  wrapperClassName?: string
};

export default function Error({ error, wrapperClassName }: Props) {
  const routeError = useRouteError() as Error;
  const errorToShow = routeError ?? error;

  return (
    <div className={wrapperClassName ?? ""}>
      <h1 className="font-bold text-accent">Error!</h1>
      <h3 className="text-center"><span>Msg: </span>{errorToShow?.message}</h3>
      {errorToShow?.stack &&
        <p className="mt-5 text-center"><span>Stack: </span>{errorToShow.stack}</p>
      }
    </div>
  );
}
