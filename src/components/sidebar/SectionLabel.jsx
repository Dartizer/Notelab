import './SectionLabel.css';
import plusIcon from '../../assets/icons/sidebar/plus.svg';

const SectionLabel = ({ text, onPlusClick, onTitleClick }) => {
  return (
    <div className="section-label">
      <span
        className="section-label-text"
        onClick={onTitleClick}
        style={{ cursor: onTitleClick ? 'pointer' : 'default' }}
      >
        {text}
      </span>

      {onPlusClick && (
        <img
          src={plusIcon}
          alt="Добавить"
          className="section-label-plus"
          onClick={onPlusClick}
        />
      )}
    </div>
  );
};

export default SectionLabel;
