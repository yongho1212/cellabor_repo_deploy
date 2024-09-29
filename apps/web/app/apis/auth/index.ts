// import instance from '../instance';
//
// interface UserData {
//     email: string;
//     displayName: string;
//     uid: string;
//     photoURL: string,
// }
//
// export const authApi = {
//     register: async (userData: UserData) => {
//         try {
//             console.log(userData,'auth api data')
//             const response = await instance.post('/user/signUp', userData);
//             console.log(response.data,'auth api data')
//             return response.data;
//         } catch (error) {
//             console.error('Registration error:', error);
//             throw error;
//         }
//     },
//
//     // login: async (email: string, password: string) => {
//     //     try {
//     //         const response = await instance.post('/auth/login', { email, password });
//     //         return response.data;
//     //     } catch (error) {
//     //         console.error('Login error:', error);
//     //         throw error;
//     //     }
//     // },
// };
{}
