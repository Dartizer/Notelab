import React from 'react';
import './SectionLabel.scss';
import plusIcon from '../../assets/icons/sidebar/plus.svg';

interface SectionLabelProps {
  text: string;
  onPlusClick?: () => void;
  onTitleClick?: () => void;
}

const SectionLabel: React.FC<SectionLabelProps> = ({
  text,
  onPlusClick,
  onTitleClick,
}) => {
  const isClickable = Boolean(onTitleClick);

  return (
    <div className="section-label">
      <span
        className="section-label-text"
        onClick={onTitleClick}
        style={{ cursor: isClickable ? 'pointer' : 'default' }}
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
