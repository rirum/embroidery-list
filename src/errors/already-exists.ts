import { ApplicationError } from '../protocols';

export function AlreadyExists(): ApplicationError {
  return {
    name: 'AlreadyExists',
    message: 'Already exists in the application',
  };
}
