import React, { useEffect, useRef, useState } from 'react';
import Icon from 'util/icons';
import styles from './styles.module.css';

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

  const [selectedItem, setSelectedItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isShowUpsideNeeded, setIsShowUpsideNeeded] = useState(false);

  const optionListRef = useRef(null);
  const itemsWrapperRef = useRef(null);
  const selectRef = useRef(null);

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

  useEffect(() => {
    if (isOpen) {
      const selectedOption = itemsWrapperRef.current.querySelector(`div[data-value="${selectedItem.value}"]`);


      if (selectedOption) {
        const selectedOptionRect = selectedOption.getBoundingClientRect();
        const optionListRect = itemsWrapperRef.current.getBoundingClientRect();

        const scrollTop = selectedOptionRect.top - optionListRect.top;

        itemsWrapperRef.current.scrollTo({
          top: scrollTop,
          behaviour: 'auto'
        });

        selectedOption.style.backgroundColor = "rgba(148, 163, 184, 0.1)";
        selectedOption.style.color = "#e3ae00";
      }
    }
  }, [isOpen, selectedItem]);

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
        <div className={styles.select} onClick={toggleOpen}>
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