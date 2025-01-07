import UserInfo from "../ui/logout-button";

interface TitleBarProps {
    title: string;
}

const TitleBar = ({ title}: TitleBarProps) => {
    const backgroundImage = '/signInBackground.svg';

    return (
        <div
            className="text-white flex items-center justify-between h-20"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h1 className="text-2xl font-bold px-6">
                {title}
            </h1>

            <UserInfo/>
        </div>
    );
};

export default TitleBar;
