import React, { useEffect, useRef, useState } from 'react';
import Icon from 'util/icons';
import styles from './styles.module.css';

/**
 * Custom Select UI Component
 * @param {*} param0 
 * @returns 
 */
const Select = ({
  defaultValue,
  name = "",
  error,
  options = [],
  label = "",
  placeholder = "",
  selectHandler,
  ...props }) => {

    const defaultSelectedItem = { value: "", label: "" }

  /**
   * Component states
   */
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowUpsideNeeded, setIsShowUpsideNeeded] = useState(false);

  const optionListRef = useRef(null); // Select dropdown reference
  const itemsWrapperRef = useRef(null); // Select options items wrapper reference
  const selectRef = useRef(null); // Select Component reference

  useEffect(() => {
    if (defaultValue) {
      const option = options.find(option => option.value === defaultValue);
      if (option) {
        setSelectedItem(option);
      }
    } else {
      setSelectedItem(defaultSelectedItem);
    }
  }, [defaultValue]);
  /**
   * Determine the position the dropdown should be positioned
   * Upside or downside.
   */
  useEffect(() => {
    console.log("Select is open: ", isOpen);
    if (isOpen) {
      /**
       * DEBUG HERE
       */
      const element = optionListRef.current;
      const elementRect = element.getBoundingClientRect();
      const browserViewPort = window.innerHeight;

      console.log("Select boud rect: ", elementRect);
      console.log("Select bottom: ", elementRect.bottom);
      console.log("Browser inner hieght: ", window.innerHeight);
      const shouldShowUpside = elementRect.bottom > browserViewPort;
      console.log("Select should open upwards: ", shouldShowUpside);
      setIsShowUpsideNeeded(shouldShowUpside);
    }
  }, [isOpen]);

  /**
   * Automically scrolls to the selected option if there's one.
   */
  useEffect(() => {
    if (isOpen) {
      /**
       * Fetch the selected option whose data-value equals
       * selected item's value
      */

      // console.log("WRAPPER: ", itemsWrapperRef.current, selectedItem.value);
      const selectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${selectedItem.value}"]`);

      /**
       * Checks if there's a selected option
       */
      if (selectedOption) {
        scrollTo(selectedOption);
      }
    }
  }, [isOpen, selectedItem]);

  const scrollTo = (selectedOption) => {
    /**
     * Scoll to the selected option
     */
    selectedOption.scrollIntoView({
      behavior: 'smooth', // Add smooth scrolling animation (optional)
      block: 'nearest' // Ensure the option is fully visible
    });
  }

  /**
   * Close the select dropdown when user clicks outside of the select component
   * boundaries
   */
  useEffect(() => {
    document.addEventListener('click', (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    });
  }, [selectRef]);

  const toggleOpen = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const selectItemHandler = (selectedItem) => {
    selectHandler(selectedItem.value);
    setSelectedItem(selectedItem);
  }

  const handleKeydown = (event) => {
    
    if (selectRef.current) {
      selectRef.current.style.outline = 'none';
    }

    if (event.key === "ArrowDown") {
      
      // Get the selected option
      const selectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${selectedItem.value}"]`);
      let nextIndex = 0;
      if (selectedOption) {
        nextIndex = options.findIndex(option => option.value === selectedOption.dataset.value) + 1;
        selectedOption.classList.remove("focused");
      }

      // Handle when length of option is reached
      if (nextIndex >= options.length) {
        nextIndex = 0;
      }

      setSelectedItem(options[nextIndex]); // Set the selected item state

      /**
       * Take care of visually updating the selected item
       */
      const currentSelectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${options[nextIndex].value}"]`);
      currentSelectedOption.classList.add('focused');

      // console.log("New selected option: ", currentSelectedOption);

      scrollTo(currentSelectedOption);

    } else if (event.key === "ArrowUp") {
      // Get the selected option
      const selectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${selectedItem.value}"]`);
      let nextIndex = 0;

      if (selectedOption) {
        nextIndex = options.findIndex(option => option.value === selectedOption.dataset.value) - 1;
        selectedOption.classList.remove("focused");
      }

      // Handle when length of option is reached
      if (nextIndex < 0) {
        nextIndex = options.length - 1;
      }

      setSelectedItem(options[nextIndex]); // Set the selected item state

      /**
       * Take care of visually updating the selected item
       */
      const currentSelectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${options[nextIndex].value}"]`);
      currentSelectedOption.classList.add('focused');

      scrollTo(currentSelectedOption);
    } else if (event.key === "Enter") {
      setIsOpen(false);
    }
  }


  return (
    <div
      className={styles.main}
      ref={selectRef}
      onKeyDown={handleKeydown}
      tabIndex={0}>
      {label ? <label>{label}</label> : null}

      <div className={styles.wrapper}>
        <div
          style={{
            border: isOpen && error ? '1px solid #dc0933' : isOpen && !error ? '1px solid #475569' : error ? "1px solid #dc0933" : '1px solid #1e293b'
          }}
          className={`${styles.select} ${error ? styles.error : ""}`}
          onClick={toggleOpen}>

          <label
            className={!selectedItem.label ? styles.placeholder : ""}>
            {selectedItem.label || placeholder}
          </label>
          <Icon
            className={styles.icon}
            name={isOpen ? "arrow-up" : "arrow-down"}
            strokeLinecap={"square"}
            strokeLinejoin={"square"}
            width={"10"}
          />
        </div>
        {
          isOpen ? (
            <div
              style={{
                height: options.length ? `10.2rem` : `3.5rem`
              }}
              ref={optionListRef}
              className={`${styles.optionList} ${isShowUpsideNeeded ? styles.showUpside : ""}`}>
              <div
                style={{
                  height: options.length ? `9.2rem` : `100%`
                }}
                ref={itemsWrapperRef}
                className={styles.itemsWrapper}>
                {
                  options.map((option, index) => (
                    <div
                      data-value={option.value}
                      className={
                        `${styles.item} 
                        ${option.value === selectedItem.value ?
                          styles.focused : ""
                        }`
                      }
                      key={index}
                      onClick={() => {
                        selectItemHandler(option);
                        setIsOpen(false);
                      }}>{option.label}</div>
                  ))
                }
              </div>
            </div>
          ) : null
        }

      </div>
      {
        error ? (
          <span>This field is required</span>
        ) : null
      }

    </div>
  );
}

export default Select;