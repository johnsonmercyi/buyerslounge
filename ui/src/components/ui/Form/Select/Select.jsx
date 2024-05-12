import React, { useEffect, useRef, useState } from 'react';
import Icon from 'util/icons';
import styles from './styles.module.css';

/**
 * Custom Select UI Component
 * @param {*} param0 
 * @returns 
 */
const Select = ({
  name = "",
  icon,
  iconColor,
  error,
  options = [],
  label = "",
  placeholder = "",
  selectHandler,
  ...props }) => {

    /**
     * Component states
     */
  const [selectedItem, setSelectedItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isShowUpsideNeeded, setIsShowUpsideNeeded] = useState(false);

  const optionListRef = useRef(null); // Select dropdown reference
  const itemsWrapperRef = useRef(null); // Select options items wrapper reference
  const selectRef = useRef(null); // Select Component reference

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
      const selectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${selectedItem.value}"]`);


      /**
       * Checks if there's a selected option
       */
      if (selectedOption) {
        const selectedOptionRect = selectedOption.getBoundingClientRect();
        const optionListRect = itemsWrapperRef.current.getBoundingClientRect();

        /**
         * Calculate the extent the options wrapper should scroll to
         */
        const scrollTop = selectedOptionRect.top - optionListRect.top;

        /**
         * Scoll to the selected option
         */
        itemsWrapperRef.current.scrollTo({
          top: scrollTop,
          behaviour: 'auto'
        });

        /**
         * Style the selected option element
         */
        selectedOption.style.backgroundColor = "rgba(148, 163, 184, 0.1)";
        selectedOption.style.color = "#e3ae00";
      }
    }
  }, [isOpen, selectedItem]);

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


  return (
    <div className={styles.main} ref={selectRef}>
      <label>{label}</label>
      <div className={styles.wrapper}>
        <div
          style={{
            border: isOpen ? '1px solid #475569' : '1px solid #1e293b'
          }}
          className={styles.select}
          onClick={toggleOpen}>
          <input
            disabled
            type="text"
            name={name}
            placeholder={placeholder}
            value={selectedItem.label || ""}
            onChange={(event) => setSelectedValue(event.target.value)}
            style={{ pointerEvents: 'none' }} />

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
              ref={optionListRef}
              className={`${styles.optionList} ${isShowUpsideNeeded ? styles.showUpside : ""}`}>
              <div
                ref={itemsWrapperRef}
                className={styles.itemsWrapper}>
                {
                  options.map((option, index) => (
                    <div
                      data-value={option.value}
                      className={styles.item}
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