import { useTranslation } from 'react-i18next';

const LanguageSwitchButton = () => {
    const { i18n, t } = useTranslation();
    const language = i18n.language;

    const changeLanguage = (lang: 'ru' | 'en') => {
        i18n.changeLanguage(lang);
    }
    return (
        <select className='default-select form-select shadow-sm' onChange={(e) => changeLanguage(e.target.value as 'ru' | 'en')} value={language}>
            <option value="ru">{t('ru')}</option>
            <option value="en">{t('en')}</option>
        </select>
    )
}

export default LanguageSwitchButton;
