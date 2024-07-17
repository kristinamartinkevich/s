import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className='row'>
      <div className='col'>
        <h1>{t('not-found')}</h1>
      </div>
    </div>
  )
}

export default NotFound;