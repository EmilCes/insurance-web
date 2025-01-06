import Link from 'next/link';
import React from 'react'

const ItemMenu = ({ title, description, icon, targetRoute }: { title: string, description: string, icon: string, targetRoute: string }) => {
    const iconImage = `/${icon}.svg`;

    return (
        <Link href={targetRoute}>
            <section className="card flex rounded-3xl hover:bg-sky-100 px-4 py-2 cursor-pointer min-h-[92px] mr-4">
                <img
                    src={iconImage}
                    alt="Ícono de accidente"
                    className="col-span-1 w-14 h-14 object-cover my-auto mr-5"
                />
                <div className="flex-1">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="text-alternGray lg:w-3/4">{description}</p>
                </div>
            </section>
        </Link>

    )
}

export default ItemMenu