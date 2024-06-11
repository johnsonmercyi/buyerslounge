import React, { useEffect, useRef, useState } from 'react';
import Icon from 'util/icons';
import styles from './styles.module.css';

const Dropdown = ({
  options = [],
  initialOption,
  labelType = "text" | "icon" | "both",
  labelIconColor,
  selectHandler,
  title,
  ...props }) => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);
  const optionRef = useRef(null);

  useEffect(() => {
    if (options.length > 0) {
      const defaultOption = options[initialOption || 0];
      setSelectedOption(defaultOption);
    }

    /**
     *  | image |
     * ------------
     * | "[{ "front": "" },{ "rear": "" }, { "side": "" },]" |
     * 
     */
  }, [options, initialOption]);

  useEffect(() => {
    if (isOpen) {
      if (optionsRef.current) {
        const selectedOptionNode = optionsRef.current.querySelector(`div[data-selected=true]`);

        if (selectedOptionNode) {
          selectedOptionNode.style.color = `var(--ui-hover-secondary-bg-color)`;
          selectedOptionNode.style.backgroundColor = `rgba(148, 163, 184, 0.1)`;
        }

        document.querySelector

      }
    }
  }, [isOpen, optionsRef]);

  const dropDownHandler = () => {
    setIsOpen(true);
  }

  const clickSelectionHandler = (selectedOption) => {
    setSelectedOption(selectedOption);
    selectHandler(selectedOption.value);
  }

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={dropDownHandler}>
        {
          labelType === "text" ? (
            <span>{selectedOption?.label}</span>
          ) : labelType === "icon" ? (
            <Icon name={selectedOption?.icon} strokeColor={labelIconColor || "#3074da"} />
          ) : (
            <div className={styles.contentWrapper}>
              <Icon name={selectedOption?.icon} strokeColor={labelIconColor || "#3074da"} />
              <span>{selectedOption?.label}</span>
            </div>
          )
        }
      </button>
      {
        isOpen ? (
          <div className={styles.optionWrapper}>
            <div className={styles.options} ref={optionsRef}>
              {
                options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      clickSelectionHandler(option);
                      setIsOpen(false);
                    }}
                    className={styles.option}
                    data-selected={
                      selectedOption.value === option.value
                    }

                    data-value={JSON.stringify(option)}
                  >
                    {
                      option.icon ?
                        <Icon className={styles.icon} name={option.icon} strokeColor={labelIconColor || "#3074da"} /> : null
                    }
                    <span className={styles.label}>{option.label}</span>
                  </div>
                ))
              }
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default Dropdown;