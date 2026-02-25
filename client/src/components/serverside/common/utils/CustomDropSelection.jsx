import { useRef, useState } from "react";
import { RxChevronDown } from "react-icons/rx";
import { useClickOutside } from "../../../../hooks/outsideClickHook";

const CustomDropSelection = ({ title, selected, options, onSelection }) => {
    const [ isDropOpen, setIsDropOpen ] = useState(false);
    const dropRef = useRef();

    useClickOutside(dropRef, () => {
             setIsDropOpen(false)
    })

    const handleOptionSelection = (option) => {
           onSelection(option);
           setIsDropOpen(false)
    }
  return (
    <div className="custom-drop-selection">
                <h5>{title}</h5>
                <div className="drop-active-selection" onClick={() => setIsDropOpen(!isDropOpen)}>
                          <span>{selected}</span>
                           <span><RxChevronDown /></span>
                </div>
                <div ref={dropRef} className={ `${ isDropOpen ? "options-dropdown active" : "options-dropdown"}`}>
                         <ul>
                                  { options.map(item => 
                                          <li key={item} onClick={() => handleOptionSelection(item)}>{item}</li>
                                  )}
                         </ul>
                </div>
    </div>
  )
}

export default CustomDropSelection