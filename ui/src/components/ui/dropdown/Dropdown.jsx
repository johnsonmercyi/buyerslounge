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

  // const dropdownRef = useRef(null);
  const optionsRef = useRef(null);
  const dropdownRef = useRef(null);
  const optionWrapperRef = useRef(null);

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

  /**
   * When the dropdown is triggered, it should gain focus
   */
  useEffect(() => {
    if (isOpen) {
      // Cause the dropdown to gain focus (The dropdown button losses focus as a result which is expected)
      optionWrapperRef.current.focus();
    }
  }, [isOpen, optionsRef.current]);

  const dropDownHandler = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const clickSelectionHandler = (selectedOption) => {
    setSelectedOption(selectedOption);
    selectHandler(selectedOption.value);
  }

  const scrollTo = (selectedOption) => {
    /**
     * Scoll to the selected option
     */
    selectedOption.scrollIntoView({
      behavior: 'smooth', // Add smooth scrolling animation (optional)
      block: 'nearest' // Ensure the option is fully visible
    });
  }

  //close the dropdown when clicked outside
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    })
  }, [dropdownRef.current]);


  const handleKeydown = (event) => {
    // Removes the outline when the dropdown component is focus
    if (optionWrapperRef.current) {
      optionWrapperRef.current.style.outline = 'none';
    }

    if (isOpen) {
      if (event.key === "ArrowDown") {      
        const selectedOption = optionsRef.current.querySelector(`div[data-selected="true"]`);
        let nextIndex = 0;
        
        if (selectedOption) {
          const currentIndex = options.findIndex(option => option.value === JSON.parse(selectedOption.dataset.value).value);
          nextIndex = currentIndex + 1;
          selectedOption.classList.remove("focused");
        }

        // Handle when length of option is reached
        if (nextIndex >= options.length) {
          nextIndex = 0;
        }

        setSelectedOption(options[nextIndex]); // Set the selected item state
        if (selectedOption) {
          selectHandler(selectedOption.dataset.value);
        }

        // Taking care of visually updating the selected item
        const currentSelectedOption = optionsRef.current.querySelector(`div[data-index="${nextIndex}"]`);
        if (currentSelectedOption) {
          currentSelectedOption.classList.add('focused');
          scrollTo(currentSelectedOption);
        }

      } else if (event.key === "Escape") {
        setIsOpen(false);
      } else if (event.key === "Enter") {
        setIsOpen(false);
        console.log("KEY: ", event.key);
      } else if (event.key === "ArrowUp") {
        const selectedOption = optionsRef.current.querySelector(`div[data-selected="true"]`);
        let nextIndex = options.length - 1;

        if (selectedOption) {
          const currentIndex = options.findIndex(option => option.value === JSON.parse(selectedOption.dataset.value).value);
          nextIndex = currentIndex - 1;
          selectedOption.classList.remove("focused");
        }

        // Handle when length of option is reached
        if (nextIndex < 0) {
          nextIndex = options.length - 1;
        }

        setSelectedOption(options[nextIndex]); // Set the selected item state
        if (selectedOption) {
          selectHandler(selectedOption.dataset.value);
        }

        // Taking care of visually updating the selected item
        const currentSelectedOption = optionsRef.current.querySelector(`div[data-index="${nextIndex}"]`);
        if (currentSelectedOption) {
          currentSelectedOption.classList.add('focused');
          scrollTo(currentSelectedOption);
        }
      }

    }
  };


  return (
    <div className={styles.dropdown} ref={dropdownRef} onKeyDown={handleKeydown} tabIndex={0}>
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
          <div ref={optionWrapperRef} className={styles.optionWrapper} tabIndex={0}>
            <div className={styles.options} ref={optionsRef}>
              {
                options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      clickSelectionHandler(option);
                      setIsOpen(false);
                    }}
                    className={
                      `${styles.option} ${selectedOption.value === option.value ? styles.focused : ""}`
                    }
                    data-selected={
                      selectedOption.value === option.value
                    }
                    data-index={index}

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