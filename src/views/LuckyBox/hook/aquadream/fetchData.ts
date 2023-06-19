import { useEffect, useState } from "react";

const UrlData = "https://aquadream-vercel.vercel.app/api/nft/";

export const GetDataNFT = (id) => {
    const [dataNFT, setDataNFT] = useState(null);
    useEffect(() => {
        if (id > -1) {
            fetch(`${UrlData}${id}`)
                .then((res) => res.json())
                .then((data) => {
                    setDataNFT(data);
                })
        }

    }, [id])
    return { dataNFT };
}