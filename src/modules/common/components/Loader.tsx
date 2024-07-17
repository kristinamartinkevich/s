import loader from '../../../assets/loader.svg';

const Loader = () => {
  return (
    <div className="page-layout">
      <div className="loader" >
        <img src={loader} alt="Loading..." />
      </div>
    </div>
  )
}

export default Loader;
