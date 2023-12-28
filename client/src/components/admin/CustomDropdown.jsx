import React, { useEffect, useRef, useState } from 'react'

const CustomDropdown = ({ options, selected, onSelect, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (selected) {
      const selectedResponse = options?.find(res => res.responseCode === selected);
      setSelectedOption(selectedResponse ? `${selectedResponse.responseCode} - ${selectedResponse.responseText}` : selected);
    }
  }, [selected]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputChange = () => {
    if(inputValue === '') return
    setSelectedOption(inputValue);  
    onSelect(inputValue)
    setInputValue('')
    toggleDropdown()
  };

  const handleSelectOption = (code) => {
    const selectedResponse = options.find(res => res.responseCode === code)
    setSelectedOption(`${selectedResponse.responseCode} - ${selectedResponse.responseText}`);
    onSelect(code);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(current => !current);
  };

  const calculateDropdownPosition = () => {
    const rect = dropdownRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;

    const verticalPosition = spaceBelow < 400 && spaceAbove > spaceBelow ? 'top' : 'bottom';
    const horizontalPosition = spaceRight < 100 && spaceLeft > spaceRight ? 'left' : 'right';

    let position = {
      [verticalPosition]: 'auto',
      [horizontalPosition]: 'auto',
      maxHeight: spaceBelow - 10,
      overflowY: 'auto',
    };

    if (verticalPosition === 'top') {
      position = {
        ...position,
        top: 'auto',
        bottom: '100%',
      };
    }

    if (horizontalPosition === 'left') {
      position = {
        ...position,
        left: 'auto',
        right: '100%',
      };
    }
  
    return position;
  };

  return (
    <div className={`relative ${width}`} ref={dropdownRef}>
      <button 
        className='border w-full py-1 rounded-md border-gray-500 text-left px-4 truncate' 
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption : 'Type or select'}
      </button>
      {isOpen && (
        <ul
          className={`bg-white flex flex-col gap-2 py-2 px-4 absolute top-7 border border-gray-400 z-20 ${options?.length > 5 ? 'h-[200px]' : 'h-auto'}`}
          style={{ ...calculateDropdownPosition() }}
        >
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option.responseCode)} className='cursor-pointer'>
              {option.responseCode} - {option.responseText}
            </li>
          ))}
          <input type="text" className='fill' placeholder='Type here' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <button className='w-full bg-gray-600 py-2 text-white rounded-md' onClick={handleInputChange}>Submit</button>
        </ul>
      )}
    </div>
  )
}

export default CustomDropdown