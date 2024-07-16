import * as Yup from 'yup';
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default [
    Yup.object().shape({
        website: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                'Enter correct url!'
            )
            .required('Please enter website'),
        email: Yup.string().email('Invalid email').required('Required'),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),

    }),
    // Yup.object().shape({
    //     college_name: Yup.string().required(`Collge name is required`),

    // })
];
