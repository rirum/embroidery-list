import { ApplicationError } from '../protocols';

export function NotFoundError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'Could not find the requested data',
  };
}
