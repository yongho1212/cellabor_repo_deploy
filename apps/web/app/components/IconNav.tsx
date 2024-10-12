'use client';

import { LuHotel } from "react-icons/lu";
import { FaSwimmingPool, FaCoffee, FaTree, FaCamera } from 'react-icons/fa';
import { AiTwotonePicture } from "react-icons/ai";
import { IoMdRestaurant } from "react-icons/io";
import { MdOutlineFestival } from "react-icons/md";
import {IconBasicProps} from '@repo/types'


interface IconsMap {
    [key: string]: JSX.Element;
}

const icons: IconsMap = {
    'hotel': <LuHotel size={30} />,
    'exhibition': <AiTwotonePicture size={30} />,
    'pool': <FaSwimmingPool size={30} />,
    'cafe': <FaCoffee size={30} />,
    'park': <FaTree size={30} />,
    'studio': <FaCamera size={30} />,
    'restaurant': <IoMdRestaurant size={30} />,
    'event': <MdOutlineFestival size={30} />
};

interface IconGridProps {
    iconData: IconBasicProps[];
}

const IconGrid: React.FC<IconGridProps> = ({ iconData }) => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {iconData.map(({ key, label }) => (
                <button key={key} className="py-1 px-2 flex flex-col items-center">
                    <div className="w-16 h-16 flex items-center justify-center relative mb-1">
                        {icons[key] || <span>No Icon</span>}
                    </div>
                    <span>{label}</span>
                </button>
            ))}
        </div>
    );
};

export default IconGrid;
