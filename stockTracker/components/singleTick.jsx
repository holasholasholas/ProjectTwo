const SingleTick = () => {
    
    async function fetchData() {
        const res = await fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=nvda&apikey=U3C581VINP17X9OQ")
        const data = await res.json()
        console.log(data)
    }
    
    
    const handleData = () => {
        fetchData()
    }
    
    return (
    <div>
       
        <ul>
            <li>Enter Ticker Name!</li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        
       <button onClick={handleData}>fetch</button>
    </div>
    )
}

export default SingleTick;