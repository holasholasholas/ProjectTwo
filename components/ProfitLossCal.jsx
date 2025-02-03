import { useState } from "react";
import "../src/ProfitLossCal.css"

const ProfitLossCal = ({watchlist}) => {

    const [positions ,SetPositions] = useState([])
    const [formData, SetFormData] = useState({
        ticker: "",
        buyPrice: "",
        sellPrice: "",
        quantity: ""
    });
    const [pnl,SetPnl] = useState('');
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        SetFormData({...formData, [name]: value});
    };
    
     
    const removePosition = (index) => {
        SetPositions(positions.filter((element, i) => i !== index));
      };

    const addPosition = (e) => {
        e.preventDefault();
    
    if(!formData.ticker || !formData.buyPrice || !formData.sellPrice || !formData.quantity){
        alert("Please fill in all fields!")
        return;
    };


    const newPosition = {
        ticker: formData.ticker,
        buyPrice: formData.buyPrice,
        sellPrice: formData.sellPrice,
        quantity: formData.quantity
    };

    SetPositions([...positions, newPosition]);
    
    setFormData({
        ticker: "",
        buyPrice: "",
        sellPrice: "",
        quantity: "",
      });
    };
      return (
          <>
        <h1>Profit Loss Tracker</h1>
        <form onSubmit={addPosition}>
            <div className="form-group">
                
                <input type="text" name="ticker" value={formData.ticker} onChange={handleInputChange} placeholder="Enter Ticker" />
                <input type="number" name="buyPrice" value={formData.buyPrice} onChange={handleInputChange} placeholder="Buy Price" />
                <input type="number" name="sellPrice" value={formData.sellPrice} onChange={handleInputChange} placeholder="Sell Price" />
                <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} placeholder="Quantity"/> 
                <button type="submit">Submit</button>           
                </div>
        </form>
        
        <div>
        <h2>Positions:</h2>
        <ul>
          {positions.map((position, index) => (
            <li key={index}>
              {position.ticker} | Buy: {position.buyPrice} | Sell: {position.sellPrice} | Quantity: {position.quantity} <button onClick={() => removePosition(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </>
        
        
    )
    
    
    
};
export default ProfitLossCal;