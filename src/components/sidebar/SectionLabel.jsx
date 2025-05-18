import './SectionLabel.css';
import plusIcon from '../../assets/icons/sidebar/plus.svg';

const SectionLabel = ({ text, onPlusClick }) => {
  return (
    <div className="section-label">
      <span className="section-label-text">{text}</span>

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
