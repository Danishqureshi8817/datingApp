import * as Yup from 'yup';



// export const signupSchema = Yup.object().shape({
//     username: Yup.string()
//       .min(6, 'Too Short!')
//       .max(15, 'Too Long!')
//       .required('Please enter username.'),

//     password: Yup.string().min(8, 'Too Short!')
//     .max(12, 'Too Long!').required('Please enter your password.'),
//   });



  export const userFormSchema = Yup.object().shape({
    name:Yup.string().min(6,'Too Short!').max(25,'Too Long!').required('Please enter name'),
    email:Yup.string().email('Invalid email').required('Please enter your email address.'),
    mobile:Yup.number().min(10,'required 10 digit number').required('Please enter your number.'),
    password:Yup.string()
    .required('password is must')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Enter Strong Password'),
    cpassword:Yup.string().required('Confirm Password is must')
    .oneOf([Yup.ref('password'),null],'Both password must match'),
    

  })


  export const userLoginSchema = Yup.object().shape({

    email:Yup.string().email('Invalid email').required('Please enter your email address.'),
     password:Yup.string().required('password is must'),
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,'Enter Strong Password'),
    

  })
