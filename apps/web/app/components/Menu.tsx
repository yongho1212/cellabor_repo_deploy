// components/Menu.tsx
import Link from 'next/link';
import Typography from '@repo/ui/components/Typography/Typography';
import Spacer from '@repo/ui/components/Spacer/Spacer';

export type MenuItemType = {
    label: string;
    action: (() => void | string | Promise<void>) | string;
};

const MenuItem = ({ item }: { item: MenuItemType }) => {
    const { label, action } = item;

    const handleClick = () => {
        if (typeof action === 'function') {
            const result = action();
            if (result instanceof Promise) {
                result.catch(error => console.error('Action failed:', error));
            }
        }
    };

    return (
        <div className="flex justify-between items-center">
            {typeof action === 'string' ? (
                <Link href={action}>
                    <Typography variant={'subtitle'}>{label}</Typography>
                </Link>
            ) : (
                <button onClick={handleClick}>
                    <Typography variant={'subtitle'}>{label}</Typography>
                </button>
            )}
            <span>&gt;</span>
        </div>
    );
};

const Menu = ({ items }: { items: MenuItemType[] }) => {
    return (
        <div className="space-y-2">
            {items.map((item, index) => (
                <div key={index}>
                    <MenuItem item={item} />
                    <Spacer height={30} />
                </div>
            ))}
        </div>
    );
};

export default Menu;
