import { MenuItemType } from '../components/Menu';

export const getMenuItems = (t: any, handleLogout: () => void): MenuItemType[] => [
    { label: t.menu.styleManagement, action: '/style-management' },
    { label: t.menu.inquiry, action: '/inquiry' },
    { label: t.menu.terms, action: '/terms' },
    { label: t.menu.privacyPolicy, action: '/privacy-policy' },
    { label: t.menu.logout, action: handleLogout },
    { label: t.menu.unsubscribe, action: '/unsubscribe' }
];
