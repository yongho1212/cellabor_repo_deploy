import { ClientAuthProvider } from '../providers/AuthProvider';

const withAuth = (WrappedComponent: React.ComponentType) => {
    return function AuthWrappedComponent(props: any) {
        return (
            <ClientAuthProvider>
                <WrappedComponent {...props} />
            </ClientAuthProvider>
        );
    };
};

export default withAuth;
