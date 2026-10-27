import { useParams } from "react-router-dom";

function CoinDetails(){
    const { name } = useParams();

    return(
        <div>
            <p>{name}</p>
        </div>
    )
}

export default CoinDetails;