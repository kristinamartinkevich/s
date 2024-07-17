import { useTranslation } from 'react-i18next';

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className='row'>
            <h1 >{t('welcome-to')}  S</h1>
        </div>
    )
}

export default Home;
