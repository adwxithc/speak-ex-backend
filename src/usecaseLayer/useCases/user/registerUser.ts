import { IOtpUser } from "../../../domainLayer/otpuser";
// import { Ilogger, Next } from "../../../infrastructureLayer/types/serverPackageTypes";
import { IOtpRepository } from "../../interface/repository/IOtpUserRepository";
import { IUserRepository } from "../../interface/repository/IUserRepository";
import { IcreateOTP } from "../../interface/services/IcreateOtp";
import { IHashpassword } from "../../interface/services/IhashPassword";
import { IJwt } from "../../interface/services/Ijwt.types";
import { ISendMail } from "../../interface/services/ISendMail";
// import { ErrorHandler } from "../../middlewares/ErrorHandler";

export const registerUser = async (
  otpRepository: IOtpRepository,
  userRepository: IUserRepository,
  sendMail: ISendMail,
  otpGenerator: IcreateOTP,
  jwtTokenGenerator: IJwt,
  bcrypt: IHashpassword,
  email: string,
  username: string,
  password: string | Promise<string>,
  // next: Next,
  // logger:Ilogger
): Promise<string | void | never> => {
  try {
    // check user exist
          console.log('reached inside the register User')
    const isUserExistOnUserRepo = await userRepository.findUserByEmail(email);
    console.log('isUserExistOnUserRepo', isUserExistOnUserRepo)
    if (isUserExistOnUserRepo){
      console.log('checking what is inside the logger ---->>>>>>>>>>>>>>>> ',logger)
        logger.logInfo('user already exist with the same mail id')
          return next(
            new ErrorHandler(400, "user already exist with the same mail id", logger)
          );
      }
    let isUserOnOtpRepo: IOtp | null = (await otpRepository.findUser(
      email
    )) as IOtp | null;

    if (isUserOnOtpRepo == null) {
      // generate otp
      const otp = await otpGenerator.generateOTP();

      // send mail
      console.log('username, email, otp --- ', username, email, otp)
      await sendMail.sendEmailVerification(username, email, otp);

      const hashPassword = await bcrypt.createHash(password as string);
      password = hashPassword;

      const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        personal_info: {
          username,
          email: email,
          password: password as string,
        },
      });

      // store data in otp repo
      if (jwtToken) await otpRepository.createOtpUserCollection({ email, otp });

      return jwtToken;
    } else {
      // generate otp
      const otp = await otpGenerator.generateOTP();

      // find old doc and delete
        await otpRepository.findUserAndDelete(email)

      // send mail
      await sendMail.sendEmailVerification(username, email, otp);

      const hashPassword = await bcrypt.createHash(password as string);
      password = hashPassword;
      const jwtToken = await jwtTokenGenerator.createVerificationJWT({
        personal_info: {
          username,
          email: email,
          password: password as string,
        },
      });
      
      // store data in otp repo
      if (jwtToken) await otpRepository.createOtpUserCollection({ email, otp });

      return jwtToken;
    }
  } catch (error: unknown | never) {

    return next(
      new ErrorHandler(
        500,
        error instanceof Error ? error.message : "Unknown error",
        logger
      )
    );
  }
};
