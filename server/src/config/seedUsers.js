import * as bcrypt from 'bcrypt';

import userModel from '../models/userSchema';

const seedUsers = async () => {
  try {
    const count = await userModel.countDocuments({});
    const hashedAdminPass = await bcrypt.hash('adminpassword', 10);

    if (count < 1) {
      const seedObj = {
        email: '',
        firstName: '',
        lastName: '',
        password: hashedAdminPass,
        role: 'admin',
        emailVerified: true,
        emailToken: null,
        isLoggedIn: false,
        loginToken: null,
        passwordResetToken: null,
        passwordResetExpires: null
      };
      userModel.create(seedObj, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          console.log(user);
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default seedUsers;
