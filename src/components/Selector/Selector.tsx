import { UIEvent, useEffect, useRef, useState } from "react";
import classes from "./Selector.module.scss";

const PART_COUNT = 10; // Количество подгружаемых элементов
const WINDOW_HEIGHT = 150; // Высота окна прокрутки 

type TOption = {
  value: string;
  title: string;
}

const options: TOption[] = Array.from({ length: 300 }).map((_, index) => ({
  value: `${index}`,
  title:  `Вариант - ${index}`,
}));

export default function Selector() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [toggleValue, setToggleValue] = useState<string>("Выбрать вариант");
  const [countItem, setCountItem] = useState<number>(1);
  const [selectOptions, setSelectOptions] = useState<TOption[]>(options);

  const refContainer = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if(!isOpen && toggleValue == "Выбрать вариант") {
      setSelectOptions(options.slice(0, PART_COUNT));
      setCountItem(1)
    }
  }, [isOpen])
  
  const scrollHandler = (event: UIEvent) => {
    if(!refList.current) return

    if(event.currentTarget.scrollTop > refList.current.offsetHeight - WINDOW_HEIGHT) {
      setCountItem(countItem + 1)
      setSelectOptions(options.slice(0, PART_COUNT * countItem))
    }
    
  }


  return (
    <div className={classes.selector}>
      <div className={`${classes.selector_toggle} ${isOpen && classes.selector_toggle__active}`} onClick={() => setOpen(!isOpen)}>
        <span className={classes.toggle_title}>{toggleValue}</span>
        <span className={classes.toggle_icon}>
          <svg width="27" height="14" viewBox="0 0 27 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.890625 1L13.6002 12L25.5622 1" stroke="#193B60" stroke-width="2"/>
          </svg>
        </span>
      </div>
      {isOpen && 
        <div className={classes.selector_options} ref={refContainer} onScroll={scrollHandler}>
          <ul className={classes.options_list} ref={refList}>
            {selectOptions.map((option) => 
              <li 
                className={`${classes.selector_option} ${option.title == toggleValue ? classes.selector_option__active : ''}`}
                onClick={() => {setToggleValue(option.title); setOpen(false)}}
                key={option.value}
              >
                <span>{option.title}</span>
              </li>
                )
              }
          </ul>
        </div>
      }
    </div>
  )
}