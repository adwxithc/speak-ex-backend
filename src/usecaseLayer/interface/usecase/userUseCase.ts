import IUser from "../../../domainLayer/user"


type UserDetails = {
    name: string;
    email: string;
    password: string;
};

export interface IUserUseCase {
  // saving user details temporary
  registerUser(
    user: UserDetails,
  ): Promise<UserDetails>;

}