import React, { useEffect, useState } from 'react'

const data = ['Ocean', 'Orange', 'Yellow', 'Purple', 'Forest', 'Green', 'Red', 'Silver'];
const Select = () => {

    const [listItem,setListItem]=useState([])
    const [isListShown, setIsListShown] = useState(false)
    const [selectedItem,setSelectedItem]=useState([])
    const [searchContent,setSearchContent]=useState("")
    const handleDownArrow = () => {
        setIsListShown(!isListShown);
        console.log(isListShown);
        console.log(listItem);
    }
    const handleFocus = () => {
        setIsListShown(true);
    }
    const handleItemAdd = (e) => {
        console.log("value is" + e.target.innerHTML);
        setSelectedItem([...selectedItem, e.target.innerHTML])

        setListItem(listItem.map((val) => {
            if (val[0] === e.target.innerHTML) {
                return [val[0], false, val[2]];
            } else {
                return [...val];
            }
        }));
    }
    const handleDelete = (e) => {
        setSelectedItem(selectedItem.filter((item) => item !== e.target.innerHTML));

        setListItem(listItem.map((val) => {
            if (val[0] === e.target.innerHTML) {
                return [val[0], true, val[2]];
            } else {
                return [...val];
            }
        }))
    }
    const handleClearAll = () => {
        setSelectedItem([]);
        setListItem(listItem.map((val) => {
            return [val[0],true,val[2]]
        }));
    }
    const onChange = (e) => {
        
        const newList = [];
        listItem.forEach((val) => {
            if (match(e.target.value, val[0])) {
                newList.push([val[0],val[1],true])
            } else {
                newList.push([val[0],val[1],false])
            }
        })
        setListItem(newList);
        setSearchContent(e.target.value);
    }
    const match = (a, b) => {
        if (a === '') {
            console.log('true')
            return true;
        } else {
            if (b.indexOf(a) === -1) {
                console.log('false')
                return false;
            } else {
                console.log('true')
                return true;
            }
        }
    }
    useEffect(() => {
        const items = [];
        data.forEach((val) => {
            items.push([val, true, true]);
        })
        setListItem(items);
    }, [])    

    return(
        <div className='select_container'>
            <div className='select_bar'>
                <div className='select_content'>
                    {
                        selectedItem.map((val, idx) => {
                            return (<div key={idx} onClick={handleDelete}>
                                        {val}
                                        
                                    </div>)
                        })
                    }
                    <div className='select_input'>
                        <input type="text" onFocus={handleFocus} value={searchContent} onChange={(e) =>onChange(e)}></input>
                    </div>
                </div>
                <div className='select_clear_all'>
                    <button onClick={handleClearAll}>ClearAll</button>
                </div>
                <div className='select_down_arrow'>
                    <button onClick={handleDownArrow}>DownArrow</button>
                </div>
            </div>
            
            {
                isListShown ? (
                    <div className='select_list'>
                        {listItem.filter(item => {
                            console.log(item[0], item[1], item[2]);
                            return (item[1] && item[2]) === true})
                            .map((value, index) => {
                                return <div key={index} onClick={handleItemAdd}>{ value[0]}</div>
                                })}
                    </div>
                ):null
            }
            
        </div>
    )   
}

export default Select;