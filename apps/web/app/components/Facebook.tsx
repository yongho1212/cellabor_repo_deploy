//
// import FacebookLogin from '@greatsumini/react-facebook-login';
//
//
// export default function FacebookLoginButton() {
//     return (
//         <FacebookLogin
//             appId={process.env.REACT_APP_FACEBOOK_APP_ID!}
//             onSuccess={async (response) => {
//                 const fbcer = await facebookCertification(response.userID);
//                 if (fbcer.status === 200) {
//                     console.log('success');
//                 } else {
//                     console.log('error');
//                 }
//                 // response.userId 저장하면 됨 => api 사용하면 userId로 검색할 수 있음
//                 // facebook 로그인 회원은 user.providerData[0].uid 값이랑 같음
//             }}
//             onFail={(error) => {
//                 console.log('Login Failed!');
//                 console.log('status: ', error.status);
//             }}
//             onProfileSuccess={(response) => {
//                 console.log('Get Profile Success!');
//                 console.log('name: ', response);
//             }}
//             render={({onClick, logout}) => (
//                 <FaFacebook
//                     onClick={onClick}
//                     // onLogoutClick={logout}
//                     size={30}
//                     color={'#4267b2'}
//                     style={{
//                         cursor: 'pointer',
//                     }}
//                 />
//             )}
//             style={{}}
//         />
//     );
// };
