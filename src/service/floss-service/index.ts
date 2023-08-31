import userRepository from '../../repositories/auth-repository';

async function postFloss() {
  const token = await userRepository.findByEmail;
}
