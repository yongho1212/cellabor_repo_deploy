import Image from 'next/image';
import dynamic from 'next/dynamic';
import {fetchPosts} from '../../lib/api';
import { Locale, getDictionary } from '@repo/i18n';
import {IconBasicProps} from '@repo/types'


const Typography = dynamic(() => import('@repo/ui/components/Typography/Typography'), { ssr: false })
const Spacer = dynamic(() => import('@repo/ui/components/Spacer/Spacer'), { ssr: false })
const FlickingSlider = dynamic(() => import('../components/Slider'), { ssr: false })
const IconGrid = dynamic(() => import('../components/IconNav'));


interface PageProps {
    params: { lang: Locale };
}


export default async function Home({ params: { lang } }: PageProps) {
    const t = await getDictionary(lang);
    const posts = await fetchPosts();

    const iconData: IconBasicProps[] = Object.entries(t.homeCategories).map(([key, label]) => ({
        key,
        label: label as string
    }));



    return (
        <div className="min-h-screen bg-background pb-16">
            <main className="w-full mx-auto px-4 ">
                <section className="py-10 text-center">
                    <Typography variant={'ptd_b_26'} as={'h1'}>{t.home.desc}</Typography>
                    <Spacer height={30}/>
                    <IconGrid iconData={iconData} />
                </section>
                <section className="py-4 ">
                    <Typography variant={'ptd_b_20'} as={'h2'}>{t.home.desc}</Typography>
                    <div className="-mx-8 ">
                        <FlickingSlider posts={posts}/>
                    </div>
                </section>

                <section className="py-4">
                    <Typography variant={'ptd_b_20'} as={'h2'}>{t.home.sectionTitle1}</Typography>
                    <div className="bg-gray-200 h-40 rounded-lg"></div>
                </section>

                <section className="py-4">
                    <Typography variant={'ptd_b_20'} as={'h2'}>{t.home.sectionTitle2}</Typography>
                    <div className="bg-gray-200 h-60 rounded-lg"></div>
                </section>


            </main>
        </div>
    )
}
