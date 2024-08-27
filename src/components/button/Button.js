import './Button.css';
export default function Button({buttontext, className='', handleClick ,value, isActive}) {
    return (
        <button
            className={`btn
            ${className}
            ${isActive ? ' active' : ''}`
            }
            onClick={() => handleClick(value)}
            >
            {buttontext}
        </button>
    );
}