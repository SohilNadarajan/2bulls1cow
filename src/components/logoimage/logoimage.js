import './logoimage.css';

export const LogoImage = ({ theme }) => {
    return (
        <>
            <div className='logo-image-container'>
                <img className='logo-image' src={require(`../../images/${theme[0]}`)} alt="Bull"></img>
                <img className='logo-image' src={require(`../../images/${theme[0]}`)} alt="Bull"></img>
                <img className='logo-image' src={require(`../../images/${theme[1]}`)} alt="Cow"></img>
            </div>
        </>
    );
};