import { useState } from "react"
import { options } from "../options";
const DinnerList = () => {
    const [days, setDays] = useState();
    const [meals, setMeals] = useState('dinner');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const createMenu = () => {
        let menu = [];
        let optionsCopy = [...options];
        const mealOpts = { lunch: ['lunch'], dinner: ['dinner'], both: ['lunch', 'dinner'] };
        const getOption = () => {
            const o = Math.floor(Math.random() * optionsCopy.length);
            const option = optionsCopy[o];
            optionsCopy.splice(o, 1);
            return option;
        }

        for (let i = 0; i < days; i++) {
            const today = new Date();
            let timeStamp = new Date(today.setDate(today.getDate() + i)).toLocaleDateString();
            let mealOption = [];
            mealOpts[meals].forEach((meal) => {
                mealOption.push({ meal: meal, dish: getOption() });
            });
            menu.push({ day: timeStamp, meals: mealOption })
            if (i % 7 === 0) {
                // refresh options
                optionsCopy = [...options];
            }
        }
        console.log(menu);
        setSelectedOptions(menu);
    }

    const navStyle = {
        width: '40%',
        border: 'solid 1px gray',
        borderRadius: '10px',
        margin: 'auto',
        padding: '10px',
    }

    const buttonStyle = {
        display: 'block',
        border: 'none',
        borderRadius: '15px',
        margin: 'auto',
        padding: '10px',
        fontSize: '15px',
        backgroundColor: '#7bd8ed',
        color: '#fff',
        fontWeight: 'bold',
    }

    return (
        <>
            <div>
                <nav style={navStyle}>
                    <label>Give me meal ideas for the next </label>
                    <input type="number" style={{ width: '40px', borderRadius: '5px' }} value={days} onChange={(e) => setDays(e.target.value)}></input>
                    <span> Days</span>
                    <hr />
                    <div>
                        <label>I want suggestions for </label>
                        <select value={meals} onChange={(e) => setMeals(e.target.value)}>
                            <option value={'lunch'}>Lunch</option>
                            <option value={'dinner'}>Dinner</option>
                            <option value={'both'}>Both!</option>
                        </select>
                    </div>
                    <button onClick={createMenu} style={buttonStyle}>Generate</button>
                </nav>
                {selectedOptions &&
                    <ul>
                        {selectedOptions.map((option, index) => {
                            return <li key={index}>
                                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{option.day}</div>
                                <div>{option.meals.map((meal, j) => {
                                    return <div key={j}>
                                        <span>{meal.meal}: </span>
                                        <span>{meal.dish}</span>
                                    </div>
                                })}</div>
                            </li>
                        })}
                    </ul>
                }
            </div>
        </>
    )
}
export default DinnerList;